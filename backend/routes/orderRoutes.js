import express from "express";
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

// router
//   .route("/:id/shipmentpaymentlink")
//   .put(protect, admin, updateOrderShipmentPaymentLink);

export default router;
