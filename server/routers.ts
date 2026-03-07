import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import * as db from "./db";
import { ENV } from "./_core/env";

// Helper to check if user is admin
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      (ctx.res as any).clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
    login: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          password: z.string().min(1),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const { email, password } = input;

        let user;
        const isAdmin = email === ENV.adminEmail && password === ENV.adminPassword;
        const isTestUser = email === ENV.userEmail && password === ENV.userPassword;

        if (isAdmin) {
          user = await db.getUserByEmail(email);
          if (!user) {
            const openId = `admin-local`;
            await db.upsertUser({
              openId,
              email,
              name: "Admin",
              role: "admin",
              lastSignedIn: new Date()
            });
            user = await db.getUserByOpenId(openId);

            // Fallback if local database is not connected
            if (!user) {
              user = {
                openId,
                name: "Admin",
                email,
                role: "admin",
              };
            }
          }
        }

        if (!user && isTestUser) {
          user = await db.getUserByEmail(email);
          if (!user) {
            const openId = `user-local`;
            await db.upsertUser({
              openId,
              email,
              name: "Test User",
              role: "user",
              lastSignedIn: new Date()
            });
            user = await db.getUserByOpenId(openId);

            // Fallback if local database is not connected
            if (!user) {
              user = {
                openId,
                name: "Test User",
                email,
                role: "user",
              };
            }
          }
        }

        if (!user) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password" });
        }

        const { sdk } = await import("./_core/sdk");
        const token = await sdk.createSessionToken(user.openId!, { name: user.name || "Admin" });

        const cookieOptions = getSessionCookieOptions(ctx.req);
        (ctx.res as any).cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: 1000 * 60 * 60 * 24 * 365 });

        return { success: true };
      }),
  }),

  // ============ PRODUCTS ============
  products: router({
    list: publicProcedure
      .input(
        z.object({
          categoryId: z.number().optional(),
          brandId: z.number().optional(),
          minPrice: z.number().optional(),
          maxPrice: z.number().optional(),
          search: z.string().optional(),
          limit: z.number().default(20),
          offset: z.number().default(0),
        })
      )
      .query(async ({ input }) => {
        return db.getProducts(input);
      }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const product = await db.getProductBySlug(input.slug);
        if (!product) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Product not found" });
        }
        const images = await db.getProductImages(product.id);
        const reviewStats = await db.getReviewStats(product.id);
        return { ...product, images, reviewStats };
      }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const product = await db.getProductById(input.id);
        if (!product) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Product not found" });
        }
        const images = await db.getProductImages(product.id);
        const reviewStats = await db.getReviewStats(product.id);
        return { ...product, images, reviewStats };
      }),

    // Admin: Create product
    create: adminProcedure
      .input(
        z.object({
          name: z.string(),
          slug: z.string(),
          description: z.string(),
          shortDescription: z.string(),
          price: z.string(),
          originalPrice: z.string().optional(),
          categoryId: z.number(),
          brandId: z.number().optional(),
          sku: z.string(),
          stock: z.number(),
          attributes: z.any().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const productId = await db.createProduct(input);
        return { id: productId, ...input };
      }),

    // Admin: Update product
    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          name: z.string().optional(),
          description: z.string().optional(),
          shortDescription: z.string().optional(),
          price: z.string().optional(),
          originalPrice: z.string().optional(),
          categoryId: z.number().optional(),
          brandId: z.number().optional(),
          stock: z.number().optional(),
          attributes: z.any().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateProduct(id, data);
        return { id, ...data };
      }),

    // Admin: Delete product
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteProduct(input.id);
        return { success: true };
      }),

    // Admin: Add product image
    addImage: adminProcedure
      .input(
        z.object({
          productId: z.number(),
          imageUrl: z.string(),
          altText: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await db.addProductImage(input.productId, input.imageUrl, input.altText);
        return { success: true };
      }),
  }),

  // ============ REVIEWS ============
  reviews: router({
    list: publicProcedure
      .input(
        z.object({
          productId: z.number(),
          limit: z.number().default(10),
          offset: z.number().default(0),
        })
      )
      .query(async ({ input }) => {
        return db.getProductReviews(input.productId, input.limit, input.offset);
      }),

    // User: Create review
    create: protectedProcedure
      .input(
        z.object({
          productId: z.number(),
          rating: z.number().min(1).max(5),
          title: z.string().optional(),
          content: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const review = await db.createReview({
          productId: input.productId,
          userId: ctx.user.id,
          rating: input.rating,
          title: input.title,
          content: input.content,
        });
        return { success: true };
      }),

    // Admin: Get pending reviews
    getPending: adminProcedure.query(async () => {
      return db.getPendingReviews();
    }),

    // Admin: Approve review
    approve: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.approveReview(input.id);
        return { success: true };
      }),

    // Admin: Reject review
    reject: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.rejectReview(input.id);
        return { success: true };
      }),
  }),

  // ============ CART ============
  cart: router({
    getItems: protectedProcedure.query(async ({ ctx }) => {
      const items = await db.getCartItems(ctx.user.id);
      // Enrich with product details
      const enriched = await Promise.all(
        items.map(async (item) => {
          const product = await db.getProductById(item.productId);
          return { ...item, product };
        })
      );
      return enriched;
    }),

    addItem: protectedProcedure
      .input(
        z.object({
          productId: z.number(),
          quantity: z.number().min(1),
        })
      )
      .mutation(async ({ input, ctx }) => {
        await db.addToCart(ctx.user.id, input.productId, input.quantity);
        return { success: true };
      }),

    updateItem: protectedProcedure
      .input(
        z.object({
          cartItemId: z.number(),
          quantity: z.number().min(0),
        })
      )
      .mutation(async ({ input }) => {
        await db.updateCartItem(input.cartItemId, input.quantity);
        return { success: true };
      }),

    removeItem: protectedProcedure
      .input(z.object({ cartItemId: z.number() }))
      .mutation(async ({ input }) => {
        await db.removeFromCart(input.cartItemId);
        return { success: true };
      }),

    clear: protectedProcedure.mutation(async ({ ctx }) => {
      await db.clearCart(ctx.user.id);
      return { success: true };
    }),
  }),

  // ============ ORDERS ============
  orders: router({
    // User: Get their orders
    list: protectedProcedure.query(async ({ ctx }) => {
      return db.getUserOrders(ctx.user.id);
    }),

    // User: Get order details
    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input, ctx }) => {
        const order = await db.getOrderById(input.id);
        if (!order) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Order not found" });
        }
        if (order.userId !== ctx.user.id && ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Access denied" });
        }
        return order;
      }),

    // User: Create order from cart
    create: protectedProcedure
      .input(
        z.object({
          shippingAddress: z.any(),
          billingAddress: z.any().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const cartItems = await db.getCartItems(ctx.user.id);
        if (cartItems.length === 0) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "Cart is empty" });
        }

        // Check stock availability
        for (const item of cartItems) {
          const product = await db.getProductById(item.productId);
          if (!product || product.stock < item.quantity) {
            throw new TRPCError({ code: "BAD_REQUEST", message: `Insufficient stock for product` });
          }
        }

        // Calculate totals
        let subtotal = 0;
        const orderItems = [];

        for (const item of cartItems) {
          const product = await db.getProductById(item.productId);
          if (!product) {
            throw new TRPCError({ code: "NOT_FOUND", message: `Product ${item.productId} not found` });
          }

          const itemTotal = parseFloat(product.price) * item.quantity;
          subtotal += itemTotal;
          orderItems.push({
            productId: product.id,
            productName: product.name,
            quantity: item.quantity,
            price: product.price,
          });
        }

        const tax = subtotal * 0.1; // 10% tax
        const shipping = subtotal > 100 ? 0 : 10; // Free shipping over 100
        const total = subtotal + tax + shipping;

        const orderNumber = `ORD-${Date.now()}-${ctx.user.id}`;

        const orderId = await db.createOrder(ctx.user.id, {
          orderNumber,
          subtotal: subtotal.toString(),
          tax: tax.toString(),
          shipping: shipping.toString(),
          total: total.toString(),
          shippingAddress: input.shippingAddress,
          billingAddress: input.billingAddress,
          items: orderItems,
        });

        // Clear cart
        await db.clearCart(ctx.user.id);

        return { orderId, orderNumber, total };
      }),

    // Admin: Get all orders
    listAll: adminProcedure
      .input(
        z.object({
          limit: z.number().default(50),
          offset: z.number().default(0),
        })
      )
      .query(async ({ input }) => {
        return db.getAllOrders(input.limit, input.offset);
      }),

    // Admin: Update order status
    updateStatus: adminProcedure
      .input(
        z.object({
          id: z.number(),
          status: z.enum(["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"]),
        })
      )
      .mutation(async ({ input }) => {
        await db.updateOrderStatus(input.id, input.status);
        return { success: true };
      }),
  }),

  // ============ CATEGORIES & BRANDS ============
  categories: router({
    list: publicProcedure.query(async () => {
      return db.getCategories();
    }),
  }),

  brands: router({
    list: publicProcedure.query(async () => {
      return db.getBrands();
    }),
  }),
});

export type AppRouter = typeof appRouter;
