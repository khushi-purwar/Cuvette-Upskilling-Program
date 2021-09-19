// model
const e = require("express");
const CartModel = require("../../../models/cart");

// adding items to a cart
exports.addItemToCart = async (req, res) => {
  try {
    const cart = await CartModel.findOne({ user: req.user._id });

    //  cart of one user already exists
    if (cart) {
      const product = req.body.cartItems.product;
      const isItemExists = cart.cartItems.find((c) => c.product == product);
      if (isItemExists) {
        const updatedCart = await CartModel.findOneAndUpdate(
          { user: req.user._id, "cartItems.product": product },
          {
            $set: {
              "cartItems.$": {
                ...req.body.cartItems,
                qty: isItemExists.qty + req.body.cartItems.qty,
              },
            },
          },
          {
            new: true,
          }
        );

        return res.status(200).json({ updatedCart });
      } else {
        const updatedCart = await CartModel.findOneAndUpdate(
          { user: req.user._id },
          {
            $push: {
              cartItems: req.body.cartItems,
            },
          },
          {
            new: true,
          }
        );

        return res.status(200).json({ updatedCart });
      }
    } else {
      // cart does not exists
      const cart = await CartModel.create({
        user: req.user._id,
        cartItems: [req.body.cartItems],
      });

      return res.status(200).json({ cart });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const cart = await CartModel.findOne({ user: req.user._id }).populate(
      "cartItems.product",
      "_id name price productPictures"
    );

    let cartItems = {};
    cart.cartItems.forEach((item, index) => {
      cartItems[item.product._id.toString()] = {
        _id: item.product._id.toString(),
        name: item.product.name,
        img: item.product.productPictures[0].img,
        price: item.product.price,
        qty: item.qty,
      };
    });
    return res.status(200).json({ cartItems });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.removeCartItems = async (req, res) => {
  try {
    const { productId } = req.body.removeItems;
    if (productId) {
      const result = await CartModel.findOneAndUpdate(
        { user: req.user._id },
        {
          $pull: {
            cartItems: {
              product: productId,
            },
          },
        },
        {new : true}
      );

      res.status(202).json({ message :"Cart updated after removing item" ,result });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
