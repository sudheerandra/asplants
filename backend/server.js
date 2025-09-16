import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import contactRouter from "./routes/contactRoute.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";


// app config
const app = express();
const port = process.env.PORT || 4000
connectDB();
connectCloudinary();


// middlewares
app.use(
  cors({
    origin: [
      process.env.CLIENT_PROD, // production frontend
      process.env.CLIENT_URL, // local dev frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());


// api endpoints
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/contact", contactRouter);
app.use("/api/reviews", reviewRoutes);
app.use("/api/coupons", couponRoutes);



app.get('/',(req,res)=>{
    res.send("API WORKING")
});

app.listen(port, ()=>console.log("Server started on PORT:"+ port));