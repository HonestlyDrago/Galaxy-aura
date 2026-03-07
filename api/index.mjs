var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// shared/const.ts
var COOKIE_NAME, ONE_YEAR_MS, UNAUTHED_ERR_MSG, NOT_ADMIN_ERR_MSG;
var init_const = __esm({
  "shared/const.ts"() {
    "use strict";
    COOKIE_NAME = "app_session_id";
    ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
    UNAUTHED_ERR_MSG = "Please login (10001)";
    NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";
  }
});

// drizzle/schema.ts
import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  decimal,
  boolean,
  json
} from "drizzle-orm/mysql-core";
var users, categories, brands, products, productImages, reviews, cartItems, orders, orderItems;
var init_schema = __esm({
  "drizzle/schema.ts"() {
    "use strict";
    users = mysqlTable("users", {
      id: int("id").autoincrement().primaryKey(),
      openId: varchar("openId", { length: 64 }).notNull().unique(),
      name: text("name"),
      email: varchar("email", { length: 320 }),
      loginMethod: varchar("loginMethod", { length: 64 }),
      role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
      phone: varchar("phone", { length: 20 }),
      address: text("address"),
      city: varchar("city", { length: 100 }),
      state: varchar("state", { length: 100 }),
      zipCode: varchar("zipCode", { length: 20 }),
      country: varchar("country", { length: 100 }),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
      lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull()
    });
    categories = mysqlTable("categories", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 100 }).notNull().unique(),
      slug: varchar("slug", { length: 100 }).notNull().unique(),
      description: text("description"),
      imageUrl: text("imageUrl"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    brands = mysqlTable("brands", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 100 }).notNull().unique(),
      slug: varchar("slug", { length: 100 }).notNull().unique(),
      description: text("description"),
      logoUrl: text("logoUrl"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    products = mysqlTable("products", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 255 }).notNull(),
      slug: varchar("slug", { length: 255 }).notNull().unique(),
      description: text("description"),
      shortDescription: varchar("shortDescription", { length: 500 }),
      price: decimal("price", { precision: 10, scale: 2 }).notNull(),
      originalPrice: decimal("originalPrice", { precision: 10, scale: 2 }),
      categoryId: int("categoryId").notNull(),
      brandId: int("brandId"),
      sku: varchar("sku", { length: 100 }).notNull().unique(),
      stock: int("stock").notNull().default(0),
      isActive: boolean("isActive").notNull().default(true),
      attributes: json("attributes"),
      // Store flexible product attributes
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    productImages = mysqlTable("productImages", {
      id: int("id").autoincrement().primaryKey(),
      productId: int("productId").notNull(),
      imageUrl: text("imageUrl").notNull(),
      altText: varchar("altText", { length: 255 }),
      displayOrder: int("displayOrder").notNull().default(0),
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
    reviews = mysqlTable("reviews", {
      id: int("id").autoincrement().primaryKey(),
      productId: int("productId").notNull(),
      userId: int("userId").notNull(),
      rating: int("rating").notNull(),
      // 1-5 stars
      title: varchar("title", { length: 255 }),
      content: text("content"),
      isApproved: boolean("isApproved").notNull().default(true),
      helpfulCount: int("helpfulCount").notNull().default(0),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    cartItems = mysqlTable("cartItems", {
      id: int("id").autoincrement().primaryKey(),
      userId: int("userId").notNull(),
      productId: int("productId").notNull(),
      quantity: int("quantity").notNull().default(1),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    orders = mysqlTable("orders", {
      id: int("id").autoincrement().primaryKey(),
      orderNumber: varchar("orderNumber", { length: 50 }).notNull().unique(),
      userId: int("userId").notNull(),
      status: mysqlEnum("status", [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled"
      ]).notNull().default("pending"),
      subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
      tax: decimal("tax", { precision: 10, scale: 2 }).notNull().default("0"),
      shipping: decimal("shipping", { precision: 10, scale: 2 }).notNull().default("0"),
      total: decimal("total", { precision: 10, scale: 2 }).notNull(),
      shippingAddress: json("shippingAddress").notNull(),
      billingAddress: json("billingAddress"),
      notes: text("notes"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    orderItems = mysqlTable("orderItems", {
      id: int("id").autoincrement().primaryKey(),
      orderId: int("orderId").notNull(),
      productId: int("productId").notNull(),
      productName: varchar("productName", { length: 255 }).notNull(),
      quantity: int("quantity").notNull(),
      price: decimal("price", { precision: 10, scale: 2 }).notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
  }
});

// server/db.ts
import { eq, and, gte, lte, like, desc, asc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}
async function upsertUser(user) {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }
  try {
    const values = {
      openId: user.openId
    };
    const updateSet = {};
    const textFields = ["name", "email", "loginMethod"];
    const assignNullable = (field) => {
      const value = user[field];
      if (value === void 0) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== void 0) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== void 0) {
      values.role = user.role;
      updateSet.role = user.role;
    }
    if (!values.lastSignedIn) {
      values.lastSignedIn = /* @__PURE__ */ new Date();
    }
    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = /* @__PURE__ */ new Date();
    }
    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet
    });
  } catch (error) {
    console.warn("[Database] Failed to upsert user (non-fatal):", error);
  }
}
async function getUserByOpenId(openId) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return void 0;
  }
  try {
    const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
    return result.length > 0 ? result[0] : void 0;
  } catch (error) {
    console.warn("[Database] getUserByOpenId failed:", error);
    return void 0;
  }
}
async function getUserByEmail(email) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return void 0;
  }
  try {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result.length > 0 ? result[0] : void 0;
  } catch (error) {
    console.warn("[Database] getUserByEmail failed:", error);
    return void 0;
  }
}
async function getProducts(filters) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [eq(products.isActive, true)];
  if (filters?.categoryId) {
    conditions.push(eq(products.categoryId, filters.categoryId));
  }
  if (filters?.brandId) {
    conditions.push(eq(products.brandId, filters.brandId));
  }
  if (filters?.minPrice !== void 0) {
    conditions.push(gte(products.price, filters.minPrice.toString()));
  }
  if (filters?.maxPrice !== void 0) {
    conditions.push(lte(products.price, filters.maxPrice.toString()));
  }
  if (filters?.search) {
    conditions.push(like(products.name, `%${filters.search}%`));
  }
  const baseQuery = db.select().from(products).where(and(...conditions)).orderBy(desc(products.createdAt));
  const limit = filters?.limit || 20;
  const offset = filters?.offset || 0;
  return baseQuery.limit(limit).offset(offset);
}
async function getProductBySlug(slug) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(products).where(and(eq(products.slug, slug), eq(products.isActive, true))).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function getProductById(id) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function getProductImages(productId) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(productImages).where(eq(productImages.productId, productId)).orderBy(asc(productImages.displayOrder));
}
async function getProductReviews(productId, limit = 10, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(reviews).where(and(eq(reviews.productId, productId), eq(reviews.isApproved, true))).orderBy(desc(reviews.createdAt)).limit(limit).offset(offset);
}
async function getReviewStats(productId) {
  const db = await getDb();
  if (!db) return { averageRating: 0, totalReviews: 0 };
  const result = await db.select().from(reviews).where(and(eq(reviews.productId, productId), eq(reviews.isApproved, true)));
  if (result.length === 0) {
    return { averageRating: 0, totalReviews: 0 };
  }
  const sum = result.reduce((acc, r) => acc + r.rating, 0);
  return {
    averageRating: sum / result.length,
    totalReviews: result.length
  };
}
async function getCartItems(userId) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(cartItems).where(eq(cartItems.userId, userId));
}
async function addToCart(userId, productId, quantity) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await db.select().from(cartItems).where(and(eq(cartItems.userId, userId), eq(cartItems.productId, productId))).limit(1);
  if (existing.length > 0) {
    return db.update(cartItems).set({ quantity: existing[0].quantity + quantity }).where(eq(cartItems.id, existing[0].id));
  }
  return db.insert(cartItems).values({ userId, productId, quantity });
}
async function updateCartItem(cartItemId, quantity) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  if (quantity <= 0) {
    return db.delete(cartItems).where(eq(cartItems.id, cartItemId));
  }
  return db.update(cartItems).set({ quantity }).where(eq(cartItems.id, cartItemId));
}
async function removeFromCart(cartItemId) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(cartItems).where(eq(cartItems.id, cartItemId));
}
async function clearCart(userId) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(cartItems).where(eq(cartItems.userId, userId));
}
async function createOrder(userId, orderData) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const order = await db.insert(orders).values({
    userId,
    orderNumber: orderData.orderNumber,
    subtotal: orderData.subtotal,
    tax: orderData.tax,
    shipping: orderData.shipping,
    total: orderData.total,
    shippingAddress: orderData.shippingAddress,
    billingAddress: orderData.billingAddress
  });
  const orderId = order.insertId;
  for (const item of orderData.items) {
    await db.insert(orderItems).values({
      orderId,
      productId: item.productId,
      productName: item.productName,
      quantity: item.quantity,
      price: item.price
    });
  }
  return orderId;
}
async function getUserOrders(userId) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt));
}
async function getOrderById(orderId) {
  const db = await getDb();
  if (!db) return void 0;
  const order = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
  if (order.length === 0) return void 0;
  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
  return { ...order[0], items };
}
async function getAllOrders(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(orders).orderBy(desc(orders.createdAt)).limit(limit).offset(offset);
}
async function updateOrderStatus(orderId, status) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(orders).set({ status }).where(eq(orders.id, orderId));
}
async function getCategories() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(categories).orderBy(asc(categories.name));
}
async function getBrands() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(brands).orderBy(asc(brands.name));
}
async function createProduct(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(products).values({
    ...data,
    isActive: true
  });
  return result.insertId;
}
async function updateProduct(productId, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(products).set(data).where(eq(products.id, productId));
}
async function deleteProduct(productId) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(products).set({ isActive: false }).where(eq(products.id, productId));
}
async function addProductImage(productId, imageUrl, altText) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const maxOrder = await db.select().from(productImages).where(eq(productImages.productId, productId));
  return db.insert(productImages).values({
    productId,
    imageUrl,
    altText,
    displayOrder: maxOrder.length
  });
}
async function createReview(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(reviews).values({
    ...data,
    isApproved: true
  });
}
async function getPendingReviews() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(reviews).where(eq(reviews.isApproved, false));
}
async function approveReview(reviewId) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(reviews).set({ isApproved: true }).where(eq(reviews.id, reviewId));
}
async function rejectReview(reviewId) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(reviews).where(eq(reviews.id, reviewId));
}
var _db;
var init_db = __esm({
  "server/db.ts"() {
    "use strict";
    init_schema();
    _db = null;
  }
});

// server/_core/env.ts
var ENV;
var init_env = __esm({
  "server/_core/env.ts"() {
    "use strict";
    ENV = {
      cookieSecret: process.env.JWT_SECRET ?? "",
      databaseUrl: process.env.DATABASE_URL ?? "",
      isProduction: process.env.NODE_ENV === "production",
      adminEmail: process.env.ADMIN_EMAIL ?? "admin@example.com",
      adminPassword: process.env.ADMIN_PASSWORD ?? "password123",
      userEmail: process.env.USER_EMAIL ?? "user@example.com",
      userPassword: process.env.USER_PASSWORD ?? "user123"
    };
  }
});

// shared/_core/errors.ts
var HttpError, ForbiddenError;
var init_errors = __esm({
  "shared/_core/errors.ts"() {
    "use strict";
    HttpError = class extends Error {
      constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = "HttpError";
      }
    };
    ForbiddenError = (msg) => new HttpError(403, msg);
  }
});

// server/_core/sdk.ts
var sdk_exports = {};
__export(sdk_exports, {
  sdk: () => sdk
});
import { parse as parseCookieHeader } from "cookie";
import { SignJWT, jwtVerify } from "jose";
var isNonEmptyString, AuthService, sdk;
var init_sdk = __esm({
  "server/_core/sdk.ts"() {
    "use strict";
    init_const();
    init_errors();
    init_db();
    init_env();
    isNonEmptyString = (value) => typeof value === "string" && value.length > 0;
    AuthService = class {
      parseCookies(cookieHeader) {
        if (!cookieHeader) {
          return /* @__PURE__ */ new Map();
        }
        const parsed = parseCookieHeader(cookieHeader);
        return new Map(Object.entries(parsed));
      }
      getSessionSecret() {
        const secret = ENV.cookieSecret;
        return new TextEncoder().encode(secret);
      }
      /**
       * Create a session token for a user openId
       */
      async createSessionToken(openId, options = {}) {
        return this.signSession(
          {
            openId,
            name: options.name || ""
          },
          options
        );
      }
      async signSession(payload, options = {}) {
        const issuedAt = Date.now();
        const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
        const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1e3);
        const secretKey = this.getSessionSecret();
        return new SignJWT({
          openId: payload.openId,
          name: payload.name
        }).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setExpirationTime(expirationSeconds).sign(secretKey);
      }
      async verifySession(cookieValue) {
        if (!cookieValue) {
          console.warn("[Auth] Missing session cookie");
          return null;
        }
        try {
          const secretKey = this.getSessionSecret();
          const { payload } = await jwtVerify(cookieValue, secretKey, {
            algorithms: ["HS256"]
          });
          const { openId, name } = payload;
          if (!isNonEmptyString(openId) || !isNonEmptyString(name)) {
            console.warn("[Auth] Session payload missing required fields");
            return null;
          }
          return { openId, name };
        } catch (error) {
          console.warn("[Auth] Session verification failed", String(error));
          return null;
        }
      }
      async authenticateRequest(req) {
        const cookies = this.parseCookies(req.headers.cookie);
        const sessionCookie = cookies.get(COOKIE_NAME);
        const session = await this.verifySession(sessionCookie);
        if (!session) {
          throw ForbiddenError("Invalid session cookie");
        }
        const user = await getUserByOpenId(session.openId);
        if (user) {
          await upsertUser({
            openId: user.openId,
            lastSignedIn: /* @__PURE__ */ new Date()
          });
          return user;
        }
        const isAdminSession = session.openId === "admin-local" || session.openId.startsWith("admin-");
        if (isAdminSession) {
          const now = /* @__PURE__ */ new Date();
          return {
            id: 0,
            openId: session.openId,
            name: session.name,
            email: ENV.adminEmail,
            loginMethod: "local",
            role: "admin",
            phone: null,
            address: null,
            city: null,
            state: null,
            zipCode: null,
            country: null,
            createdAt: now,
            updatedAt: now,
            lastSignedIn: now
          };
        }
        const isUserSession = session.openId === "user-local" || session.openId.startsWith("user-");
        if (isUserSession) {
          const now = /* @__PURE__ */ new Date();
          return {
            id: 0,
            openId: session.openId,
            name: session.name,
            email: ENV.userEmail,
            loginMethod: "local",
            role: "user",
            phone: null,
            address: null,
            city: null,
            state: null,
            zipCode: null,
            country: null,
            createdAt: now,
            updatedAt: now,
            lastSignedIn: now
          };
        }
        throw ForbiddenError("User not found");
      }
    };
    sdk = new AuthService();
  }
});

// server/vercel-entry.ts
import "dotenv/config";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// server/routers.ts
init_const();

// server/_core/cookies.ts
function isSecureRequest(req) {
  if (req.protocol === "https") return true;
  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;
  const protoList = Array.isArray(forwardedProto) ? forwardedProto : forwardedProto.split(",");
  return protoList.some((proto) => proto.trim().toLowerCase() === "https");
}
function getSessionCookieOptions(req) {
  const secure = isSecureRequest(req);
  return {
    httpOnly: true,
    path: "/",
    // sameSite:"none" requires secure:true (HTTPS). On plain HTTP (local dev)
    // use "lax" so the browser actually stores and sends the cookie.
    sameSite: secure ? "none" : "lax",
    secure
  };
}

// server/_core/systemRouter.ts
import { z } from "zod";

// server/_core/trpc.ts
init_const();
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
var t = initTRPC.context().create({
  transformer: superjson
});
var router = t.router;
var publicProcedure = t.procedure;
var requireUser = t.middleware(async (opts) => {
  const { ctx, next } = opts;
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var protectedProcedure = t.procedure.use(requireUser);
var adminProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user
      }
    });
  })
);

// server/_core/systemRouter.ts
var systemRouter = router({
  health: publicProcedure.input(
    z.object({
      timestamp: z.number().min(0, "timestamp cannot be negative")
    })
  ).query(() => ({
    ok: true
  }))
});

// server/routers.ts
init_db();
init_env();
import { z as z2 } from "zod";
import { TRPCError as TRPCError2 } from "@trpc/server";
var adminProcedure2 = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError2({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});
var appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true
      };
    }),
    login: publicProcedure.input(
      z2.object({
        email: z2.string().email(),
        password: z2.string().min(1)
      })
    ).mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      let user;
      const isAdmin = email === ENV.adminEmail && password === ENV.adminPassword;
      const isTestUser = email === ENV.userEmail && password === ENV.userPassword;
      if (isAdmin) {
        user = await getUserByEmail(email);
        if (!user) {
          const openId = `admin-local`;
          await upsertUser({
            openId,
            email,
            name: "Admin",
            role: "admin",
            lastSignedIn: /* @__PURE__ */ new Date()
          });
          user = await getUserByOpenId(openId);
          if (!user) {
            user = {
              openId,
              name: "Admin",
              email,
              role: "admin"
            };
          }
        }
      }
      if (!user && isTestUser) {
        user = await getUserByEmail(email);
        if (!user) {
          const openId = `user-local`;
          await upsertUser({
            openId,
            email,
            name: "Test User",
            role: "user",
            lastSignedIn: /* @__PURE__ */ new Date()
          });
          user = await getUserByOpenId(openId);
          if (!user) {
            user = {
              openId,
              name: "Test User",
              email,
              role: "user"
            };
          }
        }
      }
      if (!user) {
        throw new TRPCError2({ code: "UNAUTHORIZED", message: "Invalid email or password" });
      }
      const { sdk: sdk2 } = await Promise.resolve().then(() => (init_sdk(), sdk_exports));
      const token = await sdk2.createSessionToken(user.openId, { name: user.name || "Admin" });
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(COOKIE_NAME, token, { ...cookieOptions, maxAge: 1e3 * 60 * 60 * 24 * 365 });
      return { success: true };
    })
  }),
  // ============ PRODUCTS ============
  products: router({
    list: publicProcedure.input(
      z2.object({
        categoryId: z2.number().optional(),
        brandId: z2.number().optional(),
        minPrice: z2.number().optional(),
        maxPrice: z2.number().optional(),
        search: z2.string().optional(),
        limit: z2.number().default(20),
        offset: z2.number().default(0)
      })
    ).query(async ({ input }) => {
      return getProducts(input);
    }),
    getBySlug: publicProcedure.input(z2.object({ slug: z2.string() })).query(async ({ input }) => {
      const product = await getProductBySlug(input.slug);
      if (!product) {
        throw new TRPCError2({ code: "NOT_FOUND", message: "Product not found" });
      }
      const images = await getProductImages(product.id);
      const reviewStats = await getReviewStats(product.id);
      return { ...product, images, reviewStats };
    }),
    getById: publicProcedure.input(z2.object({ id: z2.number() })).query(async ({ input }) => {
      const product = await getProductById(input.id);
      if (!product) {
        throw new TRPCError2({ code: "NOT_FOUND", message: "Product not found" });
      }
      const images = await getProductImages(product.id);
      const reviewStats = await getReviewStats(product.id);
      return { ...product, images, reviewStats };
    }),
    // Admin: Create product
    create: adminProcedure2.input(
      z2.object({
        name: z2.string(),
        slug: z2.string(),
        description: z2.string(),
        shortDescription: z2.string(),
        price: z2.string(),
        originalPrice: z2.string().optional(),
        categoryId: z2.number(),
        brandId: z2.number().optional(),
        sku: z2.string(),
        stock: z2.number(),
        attributes: z2.any().optional()
      })
    ).mutation(async ({ input }) => {
      const productId = await createProduct(input);
      return { id: productId, ...input };
    }),
    // Admin: Update product
    update: adminProcedure2.input(
      z2.object({
        id: z2.number(),
        name: z2.string().optional(),
        description: z2.string().optional(),
        shortDescription: z2.string().optional(),
        price: z2.string().optional(),
        originalPrice: z2.string().optional(),
        categoryId: z2.number().optional(),
        brandId: z2.number().optional(),
        stock: z2.number().optional(),
        attributes: z2.any().optional()
      })
    ).mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateProduct(id, data);
      return { id, ...data };
    }),
    // Admin: Delete product
    delete: adminProcedure2.input(z2.object({ id: z2.number() })).mutation(async ({ input }) => {
      await deleteProduct(input.id);
      return { success: true };
    }),
    // Admin: Add product image
    addImage: adminProcedure2.input(
      z2.object({
        productId: z2.number(),
        imageUrl: z2.string(),
        altText: z2.string().optional()
      })
    ).mutation(async ({ input }) => {
      await addProductImage(input.productId, input.imageUrl, input.altText);
      return { success: true };
    })
  }),
  // ============ REVIEWS ============
  reviews: router({
    list: publicProcedure.input(
      z2.object({
        productId: z2.number(),
        limit: z2.number().default(10),
        offset: z2.number().default(0)
      })
    ).query(async ({ input }) => {
      return getProductReviews(input.productId, input.limit, input.offset);
    }),
    // User: Create review
    create: protectedProcedure.input(
      z2.object({
        productId: z2.number(),
        rating: z2.number().min(1).max(5),
        title: z2.string().optional(),
        content: z2.string().optional()
      })
    ).mutation(async ({ input, ctx }) => {
      const review = await createReview({
        productId: input.productId,
        userId: ctx.user.id,
        rating: input.rating,
        title: input.title,
        content: input.content
      });
      return { success: true };
    }),
    // Admin: Get pending reviews
    getPending: adminProcedure2.query(async () => {
      return getPendingReviews();
    }),
    // Admin: Approve review
    approve: adminProcedure2.input(z2.object({ id: z2.number() })).mutation(async ({ input }) => {
      await approveReview(input.id);
      return { success: true };
    }),
    // Admin: Reject review
    reject: adminProcedure2.input(z2.object({ id: z2.number() })).mutation(async ({ input }) => {
      await rejectReview(input.id);
      return { success: true };
    })
  }),
  // ============ CART ============
  cart: router({
    getItems: protectedProcedure.query(async ({ ctx }) => {
      const items = await getCartItems(ctx.user.id);
      const enriched = await Promise.all(
        items.map(async (item) => {
          const product = await getProductById(item.productId);
          return { ...item, product };
        })
      );
      return enriched;
    }),
    addItem: protectedProcedure.input(
      z2.object({
        productId: z2.number(),
        quantity: z2.number().min(1)
      })
    ).mutation(async ({ input, ctx }) => {
      await addToCart(ctx.user.id, input.productId, input.quantity);
      return { success: true };
    }),
    updateItem: protectedProcedure.input(
      z2.object({
        cartItemId: z2.number(),
        quantity: z2.number().min(0)
      })
    ).mutation(async ({ input }) => {
      await updateCartItem(input.cartItemId, input.quantity);
      return { success: true };
    }),
    removeItem: protectedProcedure.input(z2.object({ cartItemId: z2.number() })).mutation(async ({ input }) => {
      await removeFromCart(input.cartItemId);
      return { success: true };
    }),
    clear: protectedProcedure.mutation(async ({ ctx }) => {
      await clearCart(ctx.user.id);
      return { success: true };
    })
  }),
  // ============ ORDERS ============
  orders: router({
    // User: Get their orders
    list: protectedProcedure.query(async ({ ctx }) => {
      return getUserOrders(ctx.user.id);
    }),
    // User: Get order details
    getById: protectedProcedure.input(z2.object({ id: z2.number() })).query(async ({ input, ctx }) => {
      const order = await getOrderById(input.id);
      if (!order) {
        throw new TRPCError2({ code: "NOT_FOUND", message: "Order not found" });
      }
      if (order.userId !== ctx.user.id && ctx.user.role !== "admin") {
        throw new TRPCError2({ code: "FORBIDDEN", message: "Access denied" });
      }
      return order;
    }),
    // User: Create order from cart
    create: protectedProcedure.input(
      z2.object({
        shippingAddress: z2.any(),
        billingAddress: z2.any().optional()
      })
    ).mutation(async ({ input, ctx }) => {
      const cartItems2 = await getCartItems(ctx.user.id);
      if (cartItems2.length === 0) {
        throw new TRPCError2({ code: "BAD_REQUEST", message: "Cart is empty" });
      }
      for (const item of cartItems2) {
        const product = await getProductById(item.productId);
        if (!product || product.stock < item.quantity) {
          throw new TRPCError2({ code: "BAD_REQUEST", message: `Insufficient stock for product` });
        }
      }
      let subtotal = 0;
      const orderItems2 = [];
      for (const item of cartItems2) {
        const product = await getProductById(item.productId);
        if (!product) {
          throw new TRPCError2({ code: "NOT_FOUND", message: `Product ${item.productId} not found` });
        }
        const itemTotal = parseFloat(product.price) * item.quantity;
        subtotal += itemTotal;
        orderItems2.push({
          productId: product.id,
          productName: product.name,
          quantity: item.quantity,
          price: product.price
        });
      }
      const tax = subtotal * 0.1;
      const shipping = subtotal > 100 ? 0 : 10;
      const total = subtotal + tax + shipping;
      const orderNumber = `ORD-${Date.now()}-${ctx.user.id}`;
      const orderId = await createOrder(ctx.user.id, {
        orderNumber,
        subtotal: subtotal.toString(),
        tax: tax.toString(),
        shipping: shipping.toString(),
        total: total.toString(),
        shippingAddress: input.shippingAddress,
        billingAddress: input.billingAddress,
        items: orderItems2
      });
      await clearCart(ctx.user.id);
      return { orderId, orderNumber, total };
    }),
    // Admin: Get all orders
    listAll: adminProcedure2.input(
      z2.object({
        limit: z2.number().default(50),
        offset: z2.number().default(0)
      })
    ).query(async ({ input }) => {
      return getAllOrders(input.limit, input.offset);
    }),
    // Admin: Update order status
    updateStatus: adminProcedure2.input(
      z2.object({
        id: z2.number(),
        status: z2.enum(["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"])
      })
    ).mutation(async ({ input }) => {
      await updateOrderStatus(input.id, input.status);
      return { success: true };
    })
  }),
  // ============ CATEGORIES & BRANDS ============
  categories: router({
    list: publicProcedure.query(async () => {
      return getCategories();
    })
  }),
  brands: router({
    list: publicProcedure.query(async () => {
      return getBrands();
    })
  })
});

// server/_core/context.ts
init_sdk();
async function createContext(opts) {
  let user = null;
  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    user = null;
  }
  return {
    req: opts.req,
    res: opts.res,
    user
  };
}

// server/vercel-entry.ts
var app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext
  })
);
var vercel_entry_default = app;
export {
  vercel_entry_default as default
};
