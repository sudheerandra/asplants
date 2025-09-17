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
const allowedOrigins = [
  process.env.CLIENT_PROD,      // https://asplants-frontend.vercel.app
  process.env.CLIENT_ADMIN_PROD,       // https://asplants-admin.vercel.app
  process.env.CLIENT_URL,       // localhost for dev
  process.env.CLIENT_ADMIN_URL  // LOCAL HOST FOR ADMIN
];
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
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