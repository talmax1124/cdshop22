import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// Main Components
import Header from "./components/Header";
import Footer from "./components/Footer";
// Screens
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Products from "./screens/Products";
import ArticleScreen from "./screens/ArticleScreen";
import Articles from "./screens/Articles";
// Order Related Components / Screens
import CartScreen from "./screens/CartScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderListScreen from "./screens/OrderListScreen";

import AdditionalDetails from "./screens/AdditionalDetails";

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

import ArticleListScreen from "./screens/ArticleListScreen";
import ArticleEditScreen from "./screens/ArticleEditScreen";

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

import Sales from "./screens/Sales";
import CheckOut from "./screens/CheckOut";

import { Container } from "react-bootstrap";

const App = () => {
  return (
    <Router>
      <Header />

      <main className="py-3">
        <Route path="/" component={HomeScreen} exact />
        <Route path="/products" component={Products} />
        <Route path="/search/:keyword" component={Products} exact />
        <Route path="/page/:pageNumber" component={Products} exact />
        <Route
          path="/search/:keyword/page/:pageNumber"
          component={Products}
          exact
        />
        <Container>
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/additionaldetails" component={AdditionalDetails} />
          <Route path="/forgotpassword" component={forgotPassword} />

          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />

          <Route path="/sales" component={Sales} />
          <Route path="/checkout" component={CheckOut} />

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

          {/* Stripe Related -> Creates Order (Stripe Endpoint) */}
          <Route path="/success/:session_id" component={StripeSuccess} />

          {/* Footer Pages */}
          <Route path="/returnpolicy" component={returnpolicy} />
          <Route path="/privacypolicy" component={privacypolicy} />
          <Route path="/termsandconditions" component={termsandconditions} />
          <Route path="/category/:category" component={ShopByCategoryScreen} />
          <Route path="/brands/:brand" component={ShopByBrandScreen} />
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
          <Route path="/articles" component={Articles} />
          <Route path="/article/:id" component={ArticleScreen} />
          <Route path="/admin/articlelist" component={ArticleListScreen} />
          <Route path="/admin/article/:id/edit" component={ArticleEditScreen} />
        </Container>
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
      </main>
      <Footer />
    </Router>
  );
};

export default App;
