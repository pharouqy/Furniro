import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import About from "../pages/About";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import SingleProduct from "../pages/SingleProduct";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import CheckoutSuccess from "../pages/CheckoutSuccess";
import CheckoutFailure from "../pages/CheckoutFailure";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";

function RouteIndex() {
  return (
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
  );
}

export default RouteIndex;
