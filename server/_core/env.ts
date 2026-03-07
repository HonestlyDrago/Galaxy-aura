export const ENV = {
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  isProduction: process.env.NODE_ENV === "production",
  adminEmail: process.env.ADMIN_EMAIL ?? "admin@example.com",
  adminPassword: process.env.ADMIN_PASSWORD ?? "password123",
  userEmail: process.env.USER_EMAIL ?? "user@example.com",
  userPassword: process.env.USER_PASSWORD ?? "user123",
};
