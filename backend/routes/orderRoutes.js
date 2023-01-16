import express from "express";
import shippo from "shippo";
const Shippo = new shippo(process.env.SHIPPO_API_KEY);
// const shippo = require("shippo")(process.env.SHIPPO_API_KEY);
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToDelivered,
  updateOrderStatus,
  getMyOrders,
  getOrders,
  deleteOrder,
  updateOrderToPacked,
  updateOrderToDispatched,
  // updateOrderShipmentPaymentLink,
  cancelOrder,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { reduceCountInStock } from "../middleware/productMiddleware.js";

router
  .route("/")
  .post(protect, addOrderItems, reduceCountInStock)
  .get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router
  .route("/:id")
  .get(protect, getOrderById)
  .delete(protect, admin, deleteOrder);
router.route("/:id/pay").put(protect, reduceCountInStock);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);
router.route("/:id/orderstatus").put(protect, admin, updateOrderStatus);

router.route("/:id/packed").put(protect, admin, updateOrderToPacked);
router.route("/:id/dispatched").put(protect, admin, updateOrderToDispatched);
router.route("/:id/cancelled").put(protect, cancelOrder);

router.get("/rates", (req, res) => {
  // Replace YOUR_EASYPOST_API_KEY with your actual EasyPost API key

  // const options = {
  //   method: "POST",
  //   url: "https://api.easypost.com/v2/shipments",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer EZTKac9850fe11c04e64980be8e2892a08d8tTCJ0SdTx3hw0j6mKNxEv`,
  //   },
  //   body: {
  //     shipment: {
  //       to_address: {
  //         zip: "34758",
  //         state: "FL",
  //         country: "US",
  //       },
  //       from_address: {
  //         zip: "90210",
  //         state: "CA",
  //         country: "US",
  //       },
  //       parcel: {
  //         weight: 10,
  //       },
  //     },
  //   },
  //   json: true,
  // };

  // ShIPPO
  Shippo.address
    .create({
      name: "Basit",
      company: "codingwithbasit",
      street1: "2945 Solat Blvd",
      city: "San Francisco",
      zip: "94132",
      country: "US",
      phone: "+1 555 341 9393",
      email: "basit@codingwithbasit.com",
    })
    .then((address) => {
      console.log("shipment address", JSON.stringify(address));
    });

  // request(options, function (error, response, body) {
  //   if (error) {
  //     console.log(error);
  //     return res.send({ error });
  //   }

  //   console.log(body.rates);
  //   return res.send({ rates: body.rates });
  // });

  res.status(200).json({ message: "success" });
});

// router
//   .route("/:id/shipmentpaymentlink")
//   .put(protect, admin, updateOrderShipmentPaymentLink);

export default router;
