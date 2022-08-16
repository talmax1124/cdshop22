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

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US"],
    },
    shipping_options: [
      // {
      //   shipping_rate_data: {
      //     type: "fixed_amount",
      //     fixed_amount: {
      //       amount: 0,
      //       currency: "usd",
      //     },
      //     display_name: "Special Pickup",
      //     // Delivers between 5-7 business days
      //     delivery_estimate: {
      //       minimum: {
      //         unit: "business_day",
      //         value: 1,
      //       },
      //       maximum: {
      //         unit: "business_day",
      //         value: 4,
      //       },
      //     },
      //   },
      // },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 350,
            currency: "usd",
          },
          display_name: "Kissimmee FL Pickup",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 450,
            currency: "usd",
          },
          display_name: "Small Packet",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 3,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
    ],

    line_items,
    mode: "payment",
    customer: customer.id,
    // receipt_email: customer.email,
    allow_promotion_codes: true,
    consent_collection: {
      promotions: "auto",
    },
    success_url: `${process.env.CLIENT_URL}/success/{CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  // res.redirect(303, session.url);
  // res.send({url: `${process.env.CLIENT_URL}/success`});
  res.send({ url: session.url });
});

export default router;
