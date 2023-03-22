import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import ForgotPassword from "./screens/forgotPassword";
import EmailVerificationScreen from "./screens/EmailVerificationScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";

// Product Related Components / Screens
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";

import ArticleListScreen from "./screens/ArticleListScreen";
import ArticleEditScreen from "./screens/ArticleEditScreen";

// Pages for Footer
import Returnpolicy from "./pages/returnpolicy";
import Privacypolicy from "./pages/privacypolicy";
import Termsandconditions from "./pages/termsandconditions";
import Support from "./screens/Support";
import WWCDFY from "./screens/WWCDFY";

// Sorting
import ShopByCategoryScreen from "./screens/ShopByCategory";
import ShopByBrandScreen from "./screens/ShopByBrandScreen";

// Stripe
import StripeSuccess from "./screens/StripeSuccess";

import Sales from "./screens/Sales";
import CheckOut from "./screens/CheckOut";

// import { Container } from "react-bootstrap";

const App = () => {
  return (
    <Router>
      <Header />

      <main className="py-3">
        <Routes>
          <Route path="/" element={<HomeScreen />} exact />
          <Route path="/products" element={<Products />} />
          <Route path="/search/:keyword" element={<Products />} exact />
          <Route path="/page/:pageNumber" element={<Products />} exact />
          <Route
            path="/search/:keyword/page/:pageNumber"
            element={<Products />}
            exact
          />

          <Route path="/profile" element={<ProfileScreen/>} />
          <Route path="/order/:id" element={<OrderScreen/>} />
          <Route path="/additionaldetails" element={<AdditionalDetails/>} />
          <Route path="/forgotpassword" element={<ForgotPassword/>} />
          <Route path="/product/:id" element={<ProductScreen/>} />
          <Route path="/cart/:id?" element={<CartScreen/>} />
          <Route path="/admin/userlist" element={<UserListScreen/>} />
          <Route path="/admin/user/:id/edit" element={<UserEditScreen/>} />

          <Route path="/sales" element={<Sales/>} />
          <Route path="/checkout" element={<CheckOut/>} />

          <Route path="/admin/productlist" element={<ProductListScreen/>} exact />
          <Route
            path="/admin/productlist/:pageNumber"
            element={<ProductListScreen/>}
            exact
          />

          <Route
            path="/verify/:token"
            element={<EmailVerificationScreen/>}
            exact
          />

          <Route path="/admin/product/:id/edit" element={<ProductEditScreen/>} />
          <Route path="/admin/orderlist" element={<OrderListScreen/>} />

          <Route path="/success/:session_id" element={<StripeSuccess/>} />

          <Route path="/returnpolicy" element={<Returnpolicy />} />
          <Route path="/privacypolicy" element={<Privacypolicy />} />
          <Route path="/termsandconditions" element={<Termsandconditions />} />
          <Route
            path="/category/:category"
            element={<ShopByCategoryScreen />}
          />
          <Route path="/brands/:brand" element={<ShopByBrandScreen />} />
          <Route path="/support" element={<Support />} />
          <Route
            path="/forgot-password"
            element={<ForgotPasswordScreen />}
            exact
          />
          <Route
            path="/reset-password/:id"
            element={<ResetPasswordScreen />}
            exact
          />
          <Route path="/whatwecandoforyou" element={<WWCDFY />} exact />
          <Route path="/articles" element={<Articles />} />
          <Route path="/article/:id" element={<ArticleScreen />} />
          <Route path="/admin/articlelist" element={<ArticleListScreen />} />
          <Route
            path="/admin/article/:id/edit"
            element={<ArticleEditScreen />}
          />

          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
