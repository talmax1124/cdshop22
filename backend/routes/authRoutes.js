import express from "express";
import passport from "passport";
import session from "express-session";

import generateToken from "../utils/generateToken.js";

const router = express.Router();

const originUri = process.env.ORIGIN_URI;

// @desc Auth with Google
// @route GET /auth/google

router.get(
  "/google",
  (req, res, next) => {
    req.session.redirectPath = req.query.redirect;
    next();
  },
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// @desc Google auth callback
// @route GET /auth/google/callback

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const redirect = req.session.redirectPath;
    const redirectQuery = redirect ? `?redirect=${redirect}` : "";
    res.redirect(`${originUri}/login${redirectQuery}`);
  }
);

router.get("/currentuser", (req, res) => {
  const user = req.user;
  if (user) {
    res.json({
      _id: user._id,
      googleId: user.googleId,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.send(null);
  }
});

/* 


import express from "express";
import passport from "passport";
import session from "express-session";

import generateToken from "../utils/generateToken.js";

const router = express.Router();

const originUri = process.env.ORIGIN_URI;

// @desc Auth with Google
// @route GET /auth/google

router.get(
  "/google",
  (req, res, next) => {
    req.session.redirectPath = req.query.redirect;
    next();
  },
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// router.get(
//   "/facebook",
//   (req, res, next) => {
//     req.session.redirectPath = req.query.redirect;
//     next();
//   },
//   passport.authenticate("facebook", { scope: ["profile", "email"] })
// );

// @desc Google auth callback
// @route GET /auth/google/callback

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const redirect = req.session.redirectPath;
    const redirectQuery = redirect ? `?redirect=${redirect}` : "";
    res.redirect(`${originUri}/login${redirectQuery}`);
  }
);

// router.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", { failureRedirect: "/" }),
//   (req, res) => {
//     const redirect = req.session.redirectPath;
//     const redirectQuery = redirect ? `?redirect=${redirect}` : "";
//     res.redirect(`${originUri}/login${redirectQuery}`);
//   }
// );

router.get("/currentuser", (req, res) => {
  const user = req.user;
  if (user) {
    res.json({
      _id: user._id,
      googleId: user.googleId,
      // facebookId: user.facebookId,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.send(null);
  }
});

router.get("/api/auth/logout", (req, res) => {
  req.session.destroy(() => {
    dispatch({ type: USER_LIST_RESET });
    dispatch({ type: USER_LOGOUT });
    dispatch({
      type: USER_REGISTER_RESET,
    });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    localStorage.removeItem("ordernotes");
    req.logout();
    dispatch({ type: USER_LIST_RESET });
    res.redirect("/login");
    // res.redirect(originUri);
  });
});
// router.get("/logout", (req, res) => {
// });

export default router;


*/

router.get("/api/auth/logout", (req, res) => {
  req.session.destroy(() => {
    dispatch({ type: USER_LIST_RESET });
    dispatch({ type: USER_LOGOUT });
    dispatch({
      type: USER_REGISTER_RESET,
    });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    localStorage.removeItem("ordernotes");
    req.logout();
    dispatch({ type: USER_LIST_RESET });
    res.redirect("/login");
  })
});

export default router;
