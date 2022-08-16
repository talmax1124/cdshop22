import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// Main Components
import Header from "./components/Header";
import Footer from "./components/Footer";
// Screens
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
// Order Related Components / Screens
import CartScreen from "./screens/CartScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderListScreen from "./screens/OrderListScreen";

// User Related Components / Screens

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import forgotPassword from "./screens/forgotPassword";
import EmailVerificationScreen from "./screens/EmailVerificationScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";

// Product Related Components / Screens
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";

// Pages for Footer
import returnpolicy from "./pages/returnpolicy";
import privacypolicy from "./pages/privacypolicy";
import termsandconditions from "./pages/termsandconditions";
import Support from "./screens/Support";
import WWCDFY from "./screens/WWCDFY";

// Sorting
import ShopByCategoryScreen from "./screens/ShopByCategory";
import ShopByBrandScreen from "./screens/ShopByBrandScreen";

// Stripe
import StripeSuccess from "./screens/StripeSuccess";

import { Container } from "react-bootstrap";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Route path="/" component={HomeScreen} exact />
        <Container>
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/forgotpassword" component={forgotPassword} />

          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />

          <Route
            path="/admin/productlist"
            component={ProductListScreen}
            exact
          />
          <Route
            path="/admin/productlist/:pageNumber"
            component={ProductListScreen}
            exact
          />

          <Route
            path="/verify/:token"
            component={EmailVerificationScreen}
            exact
          />

          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
          <Route path="/admin/orderlist" component={OrderListScreen} />
          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomeScreen}
            exact
          />

          {/* Stripe Related -> Creates Order (Stripe Endpoint) */}
          <Route path="/success/:session_id" component={StripeSuccess} />

          {/* Footer Pages */}
          <Route path="/returnpolicy" component={returnpolicy} />
          <Route path="/privacypolicy" component={privacypolicy} />
          <Route path="/termsandconditions" component={termsandconditions} />
          <Route
            path="/products/category/:category"
            component={ShopByCategoryScreen}
          />
          <Route path="/products/brands/:brand" component={ShopByBrandScreen} />
          <Route path="/support" component={Support} />
          <Route
            path="/forgot-password"
            component={ForgotPasswordScreen}
            exact
          />
          <Route
            path="/reset-password/:id"
            component={ResetPasswordScreen}
            exact
          />
          <Route path="/whatwecandoforyou" component={WWCDFY} exact />
        </Container>
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
      </main>
      <Footer />
    </Router>
  );
};

export default App;
