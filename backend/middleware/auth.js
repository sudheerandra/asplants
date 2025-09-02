import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token missing. Please log in."
      });
    }

    // Verify the JWT
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    // Find user by ID
    const foundUser = await User.findById(decoded.id).select("name email");

    if (!foundUser) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    // Attach user info to request
   req.body.userId = foundUser._id;
req.body.userName = foundUser.name;

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);

    // Handle JWT errors specifically
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Please log in again."
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please log in again."
      });
    }

    // Other errors
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later."
    });
  }
};

export default authUser;
