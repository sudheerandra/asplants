import userModel from "../models/userModel.js";

// ......... GET CART DATA ...............
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    let cartdata = await userData.cartdata;
    res.json({ success: true, cartdata });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ......... ADD PRODUCTS TO CART ...............
const addToCart = async (req, res) => {
  try {
    const { userId, itemId} = req.body;

    // FIND USERID IN USERMODEL !e DATABASE
    const userData = await userModel.findById(userId);

    let cartdata = userData.cartdata || {};
     // same logic as frontend
    const quantity = cartdata[itemId] || 0;
    cartdata[itemId] = quantity + 1;

    await userModel.findByIdAndUpdate(userId, { cartdata });
    res.json({ sucess: true, message: "PRODUCT ADDED TO CART!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ......... UPDATE CART DATA ...............
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;

    const userData = await userModel.findById(userId);
    let cartdata = await userData.cartdata;

    cartdata[itemId] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartdata });
    res.json({ sucess: true, message: "CART UPDATED!" });
  } catch (error) {
    onsole.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };