import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    orderNotes,
    itemsPrice,
    totalPrice,
    shippingAddress,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      orderNotes,
      itemsPrice,
      totalPrice,
      shippingAddress,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);

    //UPDATE COUNT IN STOCK
    // ==========================================================

    for (const index in order.orderItems) {
      const item = order.orderItems[index];
      const product = await Product.findById(item.product);
      product.countInStock -= item.qty;
      await product.save();
    }
    // ========================================================
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (
    order &&
    (req.user.isAdmin || req.user._id.toString() === order.user._id.toString())
  ) {
    res.json(order);
    return;
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//UPDATE ORDER TO PACKED
const updateOrderToPacked = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPacked = true;
    order.packedAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//UPDATE ORDER TO DISPATCHED
const updateOrderToDispatched = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDispatched = true;
    order.dispatchedAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// //UPDATE ORDER Shipment Link From Stripe (Copy & Paste)
// const updateOrderShipmentPaymentLink = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id);

//   if (order) {
//     // order.isDispatched = true;
//     // order.dispatchedAt = Date.now();
//     order.shipmentPaymentLink = "No Shipment Link";

//     const updatedOrder = await order.save();
//     res.json(updatedOrder);
//   } else {
//     res.status(404);
//     throw new Error("Order not found");
//   }
// });

//UPDATE ORDER With Shipment # (Copy & Paste)
// const updateOrderShipmentInformation = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id);

//   if (order) {
//     // order.isDispatched = true;
//     // order.dispatchedAt = Date.now();

//     order.shipmentNumber = "No Shipment # Posted Yet";

//     const updatedOrder = await order.save();
//     res.json(updatedOrder);
//   } else {
//     res.status(404);
//     throw new Error("Order not found");
//   }
// });

//CANCEL ORDER
const cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isCancelled = true;
    order.cancelledAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to status
// @route   GET /api/orders/:id/status
// @access  Private/Admin

const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.orderStatus = "pending";
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order could not be updated or found");
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort([
    ["createdAt", -1],
  ]);
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate("user", "id name")
    .sort([["createdAt", -1]]);
  res.json(orders);
});

// @desc    Delete order
// @route   DELETE /api/order/:id
// @access  Private/Admin
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    await order.remove();
    res.json({ message: "Order Has Been Deleted From Database" });
  } else {
    res.status(404);
    throw new Error("Order Not Found (ERROR)");
  }
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToDelivered,
  getMyOrders,
  updateOrderStatus,
  getOrders,
  deleteOrder,
  updateOrderToPacked,
  updateOrderToDispatched,
  cancelOrder,
  // updateOrderShipmentInformation,
  // updateOrderShipmentPaymentLink,
};
