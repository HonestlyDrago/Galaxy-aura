# Galaxy Aura E-Commerce Platform - Setup Guide

## Overview

Galaxy Aura is a fully-featured, SEO-optimized e-commerce platform built with React 19, Express 4, tRPC 11, and MySQL. It includes advanced product filtering, customer reviews, shopping cart, checkout, and a comprehensive admin dashboard.

## Features

### Customer-Facing Features
- **Homepage** - Beautiful hero section with featured products
- **Product Catalog** - Browse all products with pagination
- **Advanced Filtering** - Filter by category, price range, brand, and search
- **Product Details** - Image gallery, specifications, and customer reviews
- **Customer Reviews** - Star ratings and written reviews from verified buyers
- **Shopping Cart** - Add/remove items, adjust quantities
- **Checkout** - Secure checkout with shipping address
- **Order Tracking** - View order history and status

### Admin Features
- **Product Management** - Create, edit, delete products with images and attributes
- **Order Management** - View all orders, update status, track fulfillment
- **Review Moderation** - Approve/reject customer reviews
- **Analytics Dashboard** - Sales metrics and insights

### Technical Features
- **Authentication** - JWT-based session cookies with role-based access control
- **Database** - MySQL with Drizzle ORM
- **API** - tRPC for type-safe backend procedures
- **Frontend** - React with Tailwind CSS and shadcn/ui components
- **SEO** - Semantic HTML, meta tags, structured data
- **Performance** - Optimized queries, lazy loading, caching

## Project Structure

```
galaxy-aura/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components (Home, Products, Cart, etc.)
│   │   ├── components/    # Reusable UI components
│   │   ├── lib/           # Utilities (tRPC client, etc.)
│   │   └── App.tsx        # Main routing
│   └── public/            # Static assets
├── server/                # Express backend
│   ├── routers.ts         # tRPC procedure definitions
│   ├── db.ts              # Database query helpers
│   └── _core/             # Core infrastructure
├── drizzle/               # Database schema and migrations
└── shared/                # Shared types and constants
```

## Setup Instructions

### 1. Prerequisites
- Node.js 22.x
- pnpm 10.x
- MySQL database

### 2. Environment Variables
Create a `.env` file in the project root (see `.env.example`):
- `DATABASE_URL` - MySQL connection string (e.g. `mysql://user:pass@localhost:3306/galaxy_aura`)
- `JWT_SECRET` - Secret key for signing session cookies

### 3. Installation
```bash
pnpm install
```

### 4. Database Setup
Run the Drizzle migrations to create your database schema:
```bash
pnpm db:push
```

### 5. Development Server
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

### 6. Build for Production
```bash
pnpm build
pnpm start
```

## Database Schema

### Core Tables
- **users** - User accounts with JWT session auth
- **products** - Product catalog with pricing and inventory
- **categories** - Product categories
- **brands** - Product brands
- **reviews** - Customer reviews and ratings
- **cartItems** - Shopping cart items
- **orders** - Customer orders
- **orderItems** - Items within orders
- **productImages** - Product image gallery

## API Endpoints (tRPC)

### Public Procedures
- `products.list` - Get products with filtering
- `products.getBySlug` - Get product by slug
- `products.getById` - Get product by ID
- `reviews.list` - Get product reviews
- `categories.list` - Get all categories
- `brands.list` - Get all brands
- `auth.me` - Get current user

### Protected Procedures (Authenticated Users)
- `cart.getItems` - Get user's cart
- `cart.addItem` - Add to cart
- `cart.updateItem` - Update cart item quantity
- `cart.removeItem` - Remove from cart
- `cart.clear` - Clear entire cart
- `orders.list` - Get user's orders
- `orders.getById` - Get order details
- `orders.create` - Create new order
- `reviews.create` - Submit product review

### Admin Procedures (Admin Only)
- `products.create` - Create product
- `products.update` - Update product
- `products.delete` - Delete product
- `products.addImage` - Add product image
- `orders.listAll` - Get all orders
- `orders.updateStatus` - Update order status
- `reviews.getPending` - Get pending reviews
- `reviews.approve` - Approve review
- `reviews.reject` - Reject review

## Authentication

### User Roles
- **Public** - Browse products, read reviews
- **User** - Add to cart, checkout, submit reviews, view orders
- **Admin** - Full access to product and order management

### Session Flow
Authentication uses JWT tokens stored in HTTP-only cookies. You will need to implement your own login/registration system.

## Customization

### Adding New Products
Use the Admin Dashboard to create products:
1. Navigate to `/admin`
2. Click "Add Product"
3. Fill in product details
4. Submit

### Modifying Styling
Edit `client/src/index.css` to change:
- Color palette (CSS variables)
- Typography
- Spacing and sizing

### Adding New Features
1. Update database schema in `drizzle/schema.ts`
2. Generate migration: `pnpm db:push`
3. Add query helpers in `server/db.ts`
4. Add tRPC procedures in `server/routers.ts`
5. Build UI components in `client/src/pages/`

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` is set correctly in your `.env` file
- Check MySQL server is running
- Ensure database user has proper permissions

### Build Errors
- Clear node_modules: `rm -rf node_modules && pnpm install`
- Clear build cache: `rm -rf dist .vite`
- Check TypeScript: `pnpm check`

## Testing

Run tests:
```bash
pnpm test
```

## License

MIT
