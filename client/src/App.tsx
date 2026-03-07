import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import HomePage from "@/pages/public/HomePage";
import ShopPage from "@/pages/public/ShopPage";
import ProductDetailPage from "@/pages/public/ProductDetailPage";
import CartPage from "@/pages/public/CartPage";
import CheckoutPage from "@/pages/public/CheckoutPage";
import AccountPage from "@/pages/public/AccountPage";
import OrdersPage from "@/pages/public/OrdersPage";
import OrderDetailPage from "@/pages/public/OrderDetailPage";
import LoginPage from "@/pages/public/LoginPage";
import AboutPage from "@/pages/public/AboutPage";
import ReviewsPage from "@/pages/public/ReviewsPage";
import ContactPage from "@/pages/public/ContactPage";
import AdminLayout from "@/pages/admin/AdminLayout";
import DashboardPage from "@/pages/admin/DashboardPage";
import ProductsPage from "@/pages/admin/ProductsPage";
import ProductCreatePage from "@/pages/admin/ProductCreatePage";
import ProductDetailAdminPage from "@/pages/admin/ProductDetailPage";
import ProductEditPage from "@/pages/admin/ProductEditPage";
import OrdersPageAdmin from "@/pages/admin/OrdersPage";
import OrderDetailAdminPage from "@/pages/admin/OrderDetailPage";
import SettingsPage from "@/pages/admin/SettingsPage";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={HomePage} />
      <Route path={"/login"} component={LoginPage} />
      <Route path={"/about"} component={AboutPage} />
      <Route path={"/reviews"} component={ReviewsPage} />
      <Route path={"/contact"} component={ContactPage} />
      <Route path={"/shop"} component={ShopPage} />
      <Route path={"/products"} component={ShopPage} />
      <Route path={"/product/:id"} component={ProductDetailPage} />
      <Route path={"/products/:slug"} component={ProductDetailPage} />
      <Route path={"/cart"} component={CartPage} />
      <Route path={"/checkout"} component={CheckoutPage} />
      <Route path={"/account"} component={AccountPage} />
      <Route path={"/account/orders"} component={OrdersPage} />
      <Route path={"/account/orders/:id"} component={OrderDetailPage} />
      <Route path="/admin" nest>
        <AdminLayout>
          <Switch>
            <Route path="/" component={DashboardPage} />
            <Route path="/products" component={ProductsPage} />
            <Route path="/products/create" component={ProductCreatePage} />
            <Route path="/products/:id/edit" component={ProductEditPage} />
            <Route path="/products/:id" component={ProductDetailAdminPage} />
            <Route path="/orders" component={OrdersPageAdmin} />
            <Route path="/orders/:id" component={OrderDetailAdminPage} />
            <Route path="/settings" component={SettingsPage} />
            <Route component={NotFound} />
          </Switch>
        </AdminLayout>
      </Route>
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
