import { eq, and, gte, lte, like, desc, asc, SQL } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  products,
  categories,
  brands,
  reviews,
  cartItems,
  orders,
  orderItems,
  productImages,
} from "../drizzle/schema";


let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
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

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.warn("[Database] Failed to upsert user (non-fatal):", error);
    // Do not re-throw — allow the app to continue without a DB
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.openId, openId))
      .limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.warn("[Database] getUserByOpenId failed:", error);
    return undefined;
  }
}

export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.warn("[Database] getUserByEmail failed:", error);
    return undefined;
  }
}

// ============ PRODUCTS ============

export async function getProducts(filters?: {
  categoryId?: number;
  brandId?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  limit?: number;
  offset?: number;
}) {
  const db = await getDb();
  if (!db) return [];

  const conditions: SQL[] = [eq(products.isActive, true)];

  if (filters?.categoryId) {
    conditions.push(eq(products.categoryId, filters.categoryId));
  }
  if (filters?.brandId) {
    conditions.push(eq(products.brandId, filters.brandId));
  }
  if (filters?.minPrice !== undefined) {
    conditions.push(gte(products.price, filters.minPrice.toString()));
  }
  if (filters?.maxPrice !== undefined) {
    conditions.push(lte(products.price, filters.maxPrice.toString()));
  }
  if (filters?.search) {
    conditions.push(like(products.name, `%${filters.search}%`));
  }

  const baseQuery = db
    .select()
    .from(products)
    .where(and(...conditions))
    .orderBy(desc(products.createdAt));

  const limit = filters?.limit || 20;
  const offset = filters?.offset || 0;

  return baseQuery.limit(limit).offset(offset);
}

export async function getProductBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(products)
    .where(and(eq(products.slug, slug), eq(products.isActive, true)))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getProductById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getProductImages(productId: number) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(productImages)
    .where(eq(productImages.productId, productId))
    .orderBy(asc(productImages.displayOrder));
}

// ============ REVIEWS ============

export async function getProductReviews(productId: number, limit = 10, offset = 0) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(reviews)
    .where(and(eq(reviews.productId, productId), eq(reviews.isApproved, true)))
    .orderBy(desc(reviews.createdAt))
    .limit(limit)
    .offset(offset);
}

export async function getReviewStats(productId: number) {
  const db = await getDb();
  if (!db) return { averageRating: 0, totalReviews: 0 };

  const result = await db
    .select()
    .from(reviews)
    .where(and(eq(reviews.productId, productId), eq(reviews.isApproved, true)));

  if (result.length === 0) {
    return { averageRating: 0, totalReviews: 0 };
  }

  const sum = result.reduce((acc: number, r: { rating: number }) => acc + r.rating, 0);
  return {
    averageRating: sum / result.length,
    totalReviews: result.length,
  };
}

// ============ CART ============

export async function getCartItems(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(cartItems).where(eq(cartItems.userId, userId));
}

export async function addToCart(userId: number, productId: number, quantity: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await db
    .select()
    .from(cartItems)
    .where(and(eq(cartItems.userId, userId), eq(cartItems.productId, productId)))
    .limit(1);

  if (existing.length > 0) {
    return db
      .update(cartItems)
      .set({ quantity: existing[0].quantity + quantity })
      .where(eq(cartItems.id, existing[0].id));
  }

  return db.insert(cartItems).values({ userId, productId, quantity });
}

export async function updateCartItem(cartItemId: number, quantity: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  if (quantity <= 0) {
    return db.delete(cartItems).where(eq(cartItems.id, cartItemId));
  }

  return db
    .update(cartItems)
    .set({ quantity })
    .where(eq(cartItems.id, cartItemId));
}

export async function removeFromCart(cartItemId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db.delete(cartItems).where(eq(cartItems.id, cartItemId));
}

export async function clearCart(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db.delete(cartItems).where(eq(cartItems.userId, userId));
}

// ============ ORDERS ============

export async function createOrder(
  userId: number,
  orderData: {
    orderNumber: string;
    subtotal: string;
    tax: string;
    shipping: string;
    total: string;
    shippingAddress: Record<string, unknown>;
    billingAddress?: Record<string, unknown>;
    items: Array<{ productId: number; productName: string; quantity: number; price: string }>;
  }
) {
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
    billingAddress: orderData.billingAddress,
  });

  const orderId = (order as any).insertId;

  for (const item of orderData.items) {
    await db.insert(orderItems).values({
      orderId,
      productId: item.productId,
      productName: item.productName,
      quantity: item.quantity,
      price: item.price,
    });
  }

  return orderId;
}

export async function getUserOrders(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(orders)
    .where(eq(orders.userId, userId))
    .orderBy(desc(orders.createdAt));
}

export async function getOrderById(orderId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const order = await db
    .select()
    .from(orders)
    .where(eq(orders.id, orderId))
    .limit(1);

  if (order.length === 0) return undefined;

  const items = await db
    .select()
    .from(orderItems)
    .where(eq(orderItems.orderId, orderId));

  return { ...order[0], items };
}

export async function getAllOrders(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(orders)
    .orderBy(desc(orders.createdAt))
    .limit(limit)
    .offset(offset);
}

export async function updateOrderStatus(orderId: number, status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db
    .update(orders)
    .set({ status: status as any })
    .where(eq(orders.id, orderId));
}

// ============ CATEGORIES & BRANDS ============

export async function getCategories() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(categories).orderBy(asc(categories.name));
}

export async function getBrands() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(brands).orderBy(asc(brands.name));
}

// ============ ADMIN OPERATIONS ============

export async function createProduct(data: {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: string;
  originalPrice?: string;
  categoryId: number;
  brandId?: number;
  sku: string;
  stock: number;
  attributes?: Record<string, unknown>;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(products).values({
    ...data,
    isActive: true,
  });

  return (result as any).insertId;
}

export async function updateProduct(productId: number, data: Partial<typeof products.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db.update(products).set(data).where(eq(products.id, productId));
}

export async function deleteProduct(productId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db.update(products).set({ isActive: false }).where(eq(products.id, productId));
}

export async function addProductImage(productId: number, imageUrl: string, altText?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const maxOrder = await db
    .select()
    .from(productImages)
    .where(eq(productImages.productId, productId));

  return db.insert(productImages).values({
    productId,
    imageUrl,
    altText,
    displayOrder: maxOrder.length,
  });
}

export async function createReview(data: {
  productId: number;
  userId: number;
  rating: number;
  title?: string;
  content?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db.insert(reviews).values({
    ...data,
    isApproved: true,
  });
}

export async function getPendingReviews() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(reviews).where(eq(reviews.isApproved, false));
}

export async function approveReview(reviewId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db.update(reviews).set({ isApproved: true }).where(eq(reviews.id, reviewId));
}

export async function rejectReview(reviewId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return db.delete(reviews).where(eq(reviews.id, reviewId));
}
