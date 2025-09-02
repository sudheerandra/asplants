import express from "express";
import {placeOrderRazorpay, updateOderStatus, userOrders, allOrders, verifyRazorpay, placeOder} from "../controllers/orderController.js"
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

//ADMIN FEATURES
orderRouter.post("/orderslist",adminAuth,allOrders);
orderRouter.post("/updateorderstatus",adminAuth, updateOderStatus);

//PAYMENT FEATURES
orderRouter.post("/place",authUser,placeOder);
// orderRouter.post("/stripe",authUser,placeOderStripe);
orderRouter.post("/razorpay",authUser,placeOrderRazorpay);

//USER FEATURES FOR FRONTEND
orderRouter.post("/userorders", authUser, userOrders);

//VERIFY PAYMENT 
// orderRouter.post("/verifyStripe", authUser, verifyStripe);
orderRouter.post("/verifyRazorpay", authUser, verifyRazorpay);


export default orderRouter;