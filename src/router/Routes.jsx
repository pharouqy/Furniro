import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "@/common/components/atoms/ErrorBoundary";

const Home = lazy(() => import("../pages/Home"));
const Shop = lazy(() => import("../pages/Shop"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const NotFound = lazy(() => import("../pages/NotFound"));
const SingleProduct = lazy(() => import("../pages/SingleProduct"));
const Cart = lazy(() => import("../pages/Cart"));
const Checkout = lazy(() => import("../pages/Checkout"));
const CheckoutSuccess = lazy(() => import("../pages/CheckoutSuccess"));
const CheckoutFailure = lazy(() => import("../pages/CheckoutFailure"));
const AdminLogin = lazy(() => import("../pages/AdminLogin"));
const AdminDashboard = lazy(() => import("../pages/AdminDashboard"));

function RouteIndex() {
  return (
    <ErrorBoundary>
    <Suspense fallback={null}>
    <div className="animate-fade-in">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/product/:id" element={<SingleProduct />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/checkout/success" element={<CheckoutSuccess />} />
      <Route path="/checkout/failure" element={<CheckoutFailure />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </div>
    </Suspense>
    </ErrorBoundary>
  );
}

export default RouteIndex;
