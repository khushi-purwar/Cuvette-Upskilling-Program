const express = require("express");
const Router = express.Router();

// middlewares
const { verifyToken, userMiddleware } = require("../../../middlewares/index");

// controllers
const { addItemToCart, getCartItems, removeCartItems } = require("../../../controllers/api/v1/cart");

// creating a cart
Router.post("/add", verifyToken, userMiddleware, addItemToCart);

// get cart
Router.get("/getCartItems", verifyToken, userMiddleware, getCartItems);

// remove item from the cart
Router.post("/removeItem", verifyToken, userMiddleware, removeCartItems);

module.exports = Router;
