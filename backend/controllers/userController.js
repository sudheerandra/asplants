import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import nodemailer from "nodemailer";


// Create Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN);
};

// Route for user Register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Checking user email exist or not
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "user already exists" });
    }

    // Validating email format and password length
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please Enter Valid Email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please Enter More Then 8 Characters",
      });
    }

    // Hashing Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for user Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "user doesn't exists" });
    }

    // Checking Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for adminLogin
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_LOGIN &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_TOKEN);
      res.json({ success: true, token });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//-----------------FORGOT PASSWORD------------------
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    //find email in userModel and store in varible
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User Not Found!" });
    }

    // Generate reset token
    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Pick frontend URL based on environment
    const clientUrl =
      process.env.NODE_ENV === "production"
        ? process.env.CLIENT_PROD
        : process.env.CLIENT_URL;

    const resetLink = `${clientUrl}/reset-password/${user._id}/${token}`;
  
    let mailOptions = {
      from: `"Support Team" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: "Password Reset Request",
      text: `Hello ${
        user.name || "User"
      },\n\nYou requested a password reset. Click the link below to reset your password:\n\n${resetLink}\n\nIf you did not request this, please ignore this email.`,
      html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>Hello ${user.name || "User"},</h2>
      <p>You requested a password reset. Please click the button below to reset your password:</p>
      <a href="${resetLink}" 
         style="display: inline-block; margin-top: 10px; padding: 10px 20px; background-color: green; color: white; text-decoration: none; border-radius: 5px;">
         Reset Password
      </a>
      <p style="margin-top: 20px;">If the button doesn’t work, copy and paste this link in your browser:</p>
      <p><a href="${resetLink}">"${resetLink}"</a></p>
      <br />
      <p>If you did not request this, you can safely ignore this email.</p>
      <p>— Support Team</p>
    </div>
  `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.send({ success: true, message: "successful!" });
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server error" });
  }
};

//-----------------RESET PASSWORD------------------
const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  try {
    // Verify the token (signed when forgot-password was triggered)
    const payload = jwt.verify(token, process.env.JWT_TOKEN);
    if (payload.id !== id) {
      return res.json({ success: false, message: "Invalid token" });
    }

    // Find user by ID
    const user = await userModel.findById(id);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update user password
    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: "Password reset successfully" });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Invalid or expired token" });
  }
};

export { registerUser, loginUser, adminLogin, forgotPassword, resetPassword };
