import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.get("/getstripesession/:sessionId", async (req, res) => {
  const { sessionId } = req.params;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  return res.send({ session });
});

router.post("/create-checkout-session", async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      email: req.body.email,
    },
  });

  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
          description: item.shortdescription,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.qty,
    };
  });

  // Calculate the tax amount
  const tax_percent = 7;
  let subtotal = 0;
  line_items.forEach((item) => {
    subtotal += item.price_data.unit_amount * item.quantity;
  });
  const tax_amount = Math.round(subtotal * (tax_percent / 100));

  // Add the tax amount to the line items list
  line_items.push({
    price_data: {
      currency: "usd",
      product_data: {
        name: "Tax",
        images: [
          "https://www.aradvocates.org/wp-content/uploads/6355404323_cf97f9c58e_b.jpg",
        ],
      },
      unit_amount: tax_amount,
    },
    quantity: 1,
  });

  const shipping_price = req.body.shippingPrice;
  const shipping_name = req.body.shippingTitle;
  line_items.push({
    price_data: {
      currency: "usd",
      product_data: {
        name: shipping_price > 0 ? shipping_name : "Free Shipping",
        images: [
          "https://media.istockphoto.com/id/1302438914/vector/fast-delivery-truck-icon-fast-shipping-design-for-website-and-mobile-apps-vector-illustration.jpg?s=612x612&w=0&k=20&c=1aEygfLbr7XCq2Lr61qrrFS2SjY6cVccOySPu_N7gww=",
        ],
      },
      unit_amount: shipping_price * 100,
    },
    quantity: 1,
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    customer: customer.id,
    allow_promotion_codes: true,
    success_url: `${process.env.CLIENT_URL}/success/{CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/additionaldetails`,
  });

  // res.redirect(303, session.url);
  // res.send({url: `${process.env.CLIENT_URL}/success`});
  res.send({ url: session.url });
});

export default router;
