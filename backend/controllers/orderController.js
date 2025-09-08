import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import nodemailer from "nodemailer";

//GLOBAL VARIABLE
const currency = "inr";
const deliveryCharge = 10;

//GATE WAY INITILIZATIONS - CREATE INSTANCE
//const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//GATE WAY - RAZORPAY - INITILIZATIONS - CRETE INSTANCE
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

//PALACING ORDER USING COD
const placeOder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    //CREATE ORDER DATA TO STORE DATABASE
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save(); // SAVE ORDER DATA IN DATABASE

    //CLEAR CART DATA AFTER PLACED ORDER
    await userModel.findByIdAndUpdate(userId, { cartdata: {} });

    await res.json({ success: true, message: "ORDER PLACED!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// //PALACING ORDER USING STRIPE
// const placeOderStripe = async (req, res) => {
//   try {
//     const { userId, items, amount, address } = req.body;
//     const { origin } = req.headers; // origin nothing but domain url

//     //CREATE ORDER DATA TO STORE DATABASE
//     const orderData = {
//       userId,
//       items,
//       amount,
//       address,
//       paymentMethod: "Stripe",
//       payment: false,
//       date: Date.now(),
//     };

//     // SAVE ORDER DATA IN DATABASE
//     const newOrder = new orderModel(orderData);
//     await newOrder.save();

//     // CREATE LINE ITEMS
//     const line_items = items.map((item) => ({
//       price_data: {
//         currency: currency,
//         product_data: {
//           name: item.name,
//         },
//         unit_amount: item.price * 100,
//       },
//       quantity: item.quantity,
//     }));

//     line_items.push({
//       price_data: {
//         currency: currency,
//         product_data: {
//           name: "Delivery Charge",
//         },
//         unit_amount: deliveryCharge * 100,
//       },
//       quantity: 1,
//     });

//     // CREATE SESSION FOR URL
//     const session = await stripe.checkout.sessions.create({
//       success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
//       cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
//       line_items,
//       mode: "payment",
//     });

//     res.json({ success: true, session_url: session.url });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // VERIFY STRIPE PAYMENT
// const verifyStripe = async (req, res) => {
//   const { success, orderId, userId } = req.body;
//   try {
//     if (success === "true") {
//       await orderModel.findByIdAndUpdate(orderId, { payment: true });
//       // Remove cartdata
//       await userModel.findByIdAndUpdate(userId, { cartdata: {} });
//       res.json({ success: true, message: "Payment Successfull!" });
//     } else {
//       await orderModel.findByIdAndDelete(orderId);
//       res.json({ success: false, message: "Payment failed!" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

//PALACING ORDER USING RAZORPAY
const placeOrderRazorpay = async (req, res) => {
  try {
    const {
      userId,
      items,
      amount,
      address,
      discount = 0,
      delivery_fee = 0,
    } = req.body;

    //CREATE ORDER DATA TO STORE DATABASE
    const orderData = {
      userId,
      items,
      amount,
      address,
      discount,
      delivery_fee,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    // SAVE ORDER DATA IN DATABASE
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // CRATE OPTIONS
    const options = {
      amount: amount * 100, // amount in paise (₹1 = 100 paise)
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString(),
    };

    //CREATE RAZORPAY ORDERS
    razorpay.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error });
      }
      res.json({ success: true, order });
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// VERIFY STRIPE PAYMENT
const verifyRazorpay = async (req, res) => {
  try {
    const { userId, razorpay_order_id } = req.body;

    const orderInfo = await razorpay.orders.fetch(razorpay_order_id);
    if (orderInfo.status === "paid") {
      //await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      const order = await orderModel.findByIdAndUpdate(
        orderInfo.receipt,
        { payment: true },
        { new: true }
      );

      if (!order) {
        return res.json({ success: false, message: "Order not found!" });
      }
      // console.log("ORDER... ", order);

      // get user details
      const user = await userModel.findById(userId);
      //console.log("📧 Sent to:", user.email);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      // use delivery email from order.address
      const customerEmail = order.address?.email;
      //console.log("Customer Email...", customerEmail);

      // send confirmation mail
      await transporter.sendMail({
        from: `"AS Plants" <${process.env.SMTP_USER}>`,
        to: customerEmail,
        subject: "AS Plants Order Confirmation 🌱",
        html: `
    <h2>Thank you for your order, ${user.name}!</h2>
    <p>Your payment was successful and your order is being processed.</p>
    <ul>
      ${order.items
        .map(
          (item) =>
            `<li>${item.name} - Qty: ${item.quantity} - ₹${item.price}</li>`
        )
        .join("")}
    </ul>
    <p><b>Subtotal:</b> ₹${
      order.amount + order.discount - order.delivery_fee
    }</p>
    <p><b>Shipping Fee:</b> ₹${order.delivery_fee}</p>
    <p><b>Discount:</b> -₹${order.discount}</p>
    <p><b>Total Paid:</b> ₹${order.amount}</p>
    <p>We’ll notify you when your order is on the way! 🌿</p>
  `,
      });

      await userModel.findByIdAndUpdate(userId, { cartdata: {} });
      res.json({ success: true, message: "Payment Successful!" });
    } else {
      res.json({ success: false, message: "Payment Failed!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//ALL ORDERS FROM ADMIN PANEL
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, message: "Status Updated!", orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//USER ORDER DATA FROM FRONTEND
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    //console.log("ORDERS....", orders);
    res.json({ success: true, message: "Status Updated!", orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//UPDATE ORDER FROM ADMIN PANEL
const updateOderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Search Orders
const searchOrders = async (req, res) => {
  const { orderId, userId } = req.query;
  let query = {};
  if (orderId) query._id = orderId;
  if (userId) query.userId = userId;

  const orders = await orderModel
    .find(query)
    .populate("userId", "name email phone address");

  if (!orders.length)
    return res.status(404).json({ message: "No orders found" });

  res.json(orders);
};

export {
  placeOder,
  placeOrderRazorpay,
  updateOderStatus,
  userOrders,
  allOrders,
  verifyRazorpay,
  searchOrders,
};
