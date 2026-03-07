# Galaxy Aura Admin Dashboard

A modern, luxury-themed e-commerce admin dashboard built with React, TypeScript, and Tailwind CSS.

## 🎨 Design System

### Color Palette
- **Primary**: Purple (`oklch(0.65 0.25 280)`) - Main brand color
- **Accent**: Cyan (`oklch(0.55 0.22 200)`) - Supporting accent
- **Background**: Dark navy (`oklch(0.12 0.01 0)`) - Premium dark aesthetic
- **Foreground**: Off-white (`oklch(0.95 0.01 0)`) - High contrast text

The dashboard uses a dark luxury aesthetic inspired by NovaSpheress with purple and cyan accents throughout.

## 📁 Project Structure

```
/app
  /products
    /[id]
      /edit
        page.tsx          # Edit product page
      page.tsx            # Product detail page
    /create
      page.tsx            # Create product page
    page.tsx              # Products list page
  /orders
    /[id]
      page.tsx            # Order detail page
    page.tsx              # Orders list page
  /settings
    page.tsx              # Settings page
  page.tsx                # Dashboard home
  layout.tsx              # Root layout with dark mode
  globals.css             # Design tokens and global styles

/components/admin
  /layout.tsx             # Admin layout wrapper with sidebar
  /sidebar.tsx            # Navigation sidebar
  /dashboard.tsx          # Dashboard overview component
  /stat-card.tsx          # Stat card component
  /recent-orders.tsx      # Recent orders widget
  /inventory-alerts.tsx   # Inventory alerts widget
  
  /products
    /products-manager.tsx # Products page wrapper
    /products-list.tsx    # Products table
    /product-form.tsx     # Create/edit form
    /product-detail.tsx   # Product detail view
  
  /orders
    /orders-manager.tsx   # Orders page wrapper
    /orders-list.tsx      # Orders table
    /order-detail.tsx     # Order detail with timeline

/hooks
  /useProducts.ts         # Mock products hook - replace with tRPC
  /useOrders.ts           # Mock orders hook - replace with tRPC
  /useAdminRoute.ts       # Route tracking hook

/types
  /product.ts             # Product interface
  /order.ts               # Order interface
```

## 🚀 Features

### Dashboard
- Overview with stat cards (revenue, orders, products, growth)
- Sales chart (6-month trend)
- Inventory alerts for low stock items
- Recent orders table with quick links

### Products Management
- Searchable product listing with filters
- View product details with profit analysis
- Create new products with full form validation
- Edit existing products
- Stock level indicators and visual cues
- Pricing and inventory analytics

### Orders Management
- Filterable order list by status (pending, processing, shipped, delivered)
- Real-time order status updates
- Order detail page with:
  - Order timeline with status progression
  - Customer information
  - Shipping address
  - Order items breakdown
  - Order summary with totals
- Export to PDF (stub ready for implementation)

### Settings
- Store configuration (name, email, currency, timezone)
- Shipping settings (default cost, free shipping threshold)
- About section

## 🔧 Technical Stack

- **React 19.2** - Latest React with functional components
- **Next.js 16** - App Router
- **TypeScript** - Full type safety
- **Tailwind CSS 4** - Utility-first styling
- **shadcn/ui** - Component library
- **Radix UI** - Primitive components
- **lucide-react** - Icon library
- **wouter** - Lightweight routing
- **Recharts** - Data visualization

## 🔄 Mock Data & Integration

All components use hook-based state management with mocked data:

### useProducts Hook
```typescript
const { products, isLoading, error } = useProducts()
```
Currently returns 6 mock products. Replace with your tRPC queries:
```typescript
const { data: products } = trpc.products.list.useQuery()
```

### useOrders Hook
```typescript
const { orders, isLoading, error } = useOrders()
```
Currently returns 8 mock orders. Replace with:
```typescript
const { data: orders } = trpc.orders.list.useQuery()
```

## 📝 Form Structure

All forms are ready for backend integration:
- **ProductForm** validates input and logs form data
- **OrderDetail** has status update functionality
- Forms use controlled components for easy mutation integration

To integrate with tRPC:
```typescript
const createMutation = trpc.products.create.useMutation()

const handleSubmit = (formData) => {
  createMutation.mutate(formData)
}
```

## 🎯 Customization Guide

### Changing Colors
Edit `/app/globals.css` CSS variables in the `.dark` section:
```css
.dark {
  --primary: oklch(0.65 0.25 280);      /* Change this */
  --accent: oklch(0.55 0.22 200);       /* And this */
  --background: oklch(0.12 0.01 0);     /* And more */
}
```

### Adding Navigation Items
Edit `/components/admin/sidebar.tsx` `navItems` array:
```typescript
const navItems = [
  { href: '/path', label: 'New Page', icon: IconComponent },
]
```

### Modifying Stat Cards
Update the stats in `/components/admin/dashboard.tsx`:
```typescript
<StatCard
  title="Your Title"
  value="$1,234.56"
  change="+12% growth"
  icon={Icon}
  color="from-primary to-accent"
/>
```

## 🔌 Next Steps for Backend Integration

1. **Setup tRPC/API**
   - Create queries: `products.list`, `products.get`, `orders.list`, `orders.get`
   - Create mutations: `products.create`, `products.update`, `products.delete`, `orders.updateStatus`

2. **Replace Mock Hooks**
   - Update `useProducts` to use tRPC query
   - Update `useOrders` to use tRPC query

3. **Add Form Mutations**
   - ProductForm: Add `products.create` and `products.update` mutations
   - OrderDetail: Add `orders.updateStatus` mutation

4. **Add Error Handling**
   - Use toast notifications (already using `sonner`)
   - Handle loading states
   - Show error messages

5. **Add Pagination**
   - Products list: Add cursor-based pagination
   - Orders list: Add pagination controls

## 📱 Responsive Design

The dashboard is fully responsive:
- **Mobile**: Single column, collapsible sidebar
- **Tablet**: Two-column grid layouts
- **Desktop**: Full multi-column layouts with expanded features

## 🎨 Component Library Used

- Cards - `ui/card`
- Buttons - `ui/button`
- Inputs - `ui/input`
- Textareas - `ui/textarea`
- Badges - `ui/badge`
- Charts - Recharts integration

All components follow the dark theme and use design tokens from globals.css.

## 🚦 Status Indicators

Orders use color-coded status badges:
- **Pending** (Yellow)
- **Processing** (Blue)
- **Shipped** (Purple)
- **Delivered** (Green)

Stock levels use visual indicators:
- **Good** (Green) - Stock > 10 units
- **Warning** (Yellow) - Stock 5-10 units
- **Critical** (Red) - Stock < 5 units

## 💡 Pro Tips

1. Use the dark mode CSS variables for consistent theming
2. All forms validate before submission - extend validation as needed
3. Charts automatically adapt to viewport width with ResponsiveContainer
4. Icons are from lucide-react (all 564+ icons available)
5. Use `cn()` utility from `lib/utils.ts` for conditional class merging

---

**Ready for deployment!** Once you connect your tRPC backend, this dashboard will handle all your e-commerce admin needs for Galaxy Aura.
