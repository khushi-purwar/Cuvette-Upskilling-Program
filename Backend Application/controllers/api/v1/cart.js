// model
const e = require("express");
const CartModel = require("../../../models/cart");

exports.addItemToCart = (req,res)=>{
  
    CartModel.findOne( { user : req.user._id})
    .exec ( (error ,cart ) =>{
        if(error)
            return res.status(400).json({error});
            //  cart of one user already exists
        if(cart) {
              
            const product = req.body.cartItems.product;
            const isItemExists = cart.cartItems.find( c => c.product == product)
            if(isItemExists)
            {
                CartModel.findOneAndUpdate( {user : req.user._id , "cartItems.product" : product} ,{
                    "$set" : {
                        "cartItems.$" : {
                            ... req.body.cartItems,
                            qty : isItemExists.qty + req.body.cartItems.qty
                        }
                    }
                   
                }, {
                    new :true
                } )
                .exec( ( error, updatedCart) =>{
                    if(error)
                       return res.status(400).json({error});
                    if(updatedCart)
                       return res.status(200).json({updatedCart});
                })
            }
            else{
                CartModel.findOneAndUpdate( {user : req.user._id} ,{
                    "$push" : {
                        "cartItems" : req.body.cartItems
                    }
                } )
                .exec( ( error, updatedCart) =>{
                    if(error)
                       return res.status(400).json({error});
                    if(updatedCart)
                       return res.status(200).json({updatedCart});
                })
            }
          
        }
        else{                 // cart does not exists
            const cart = new CartModel({
                user : req.user._id,
                cartItems : [req.body.cartItems]
            });
        
            cart.save((error, cart)=>{
                if(error)
                   return res.status(400).json({ error });
                if(cart)
                   return res.status(200).json({ cart });
            })
        }
    })

    
}


exports.getCartItems = ()=>{
    CartModel.findOne({ user: req.user._id })
    .populate("cartItems.product", "_id name price productPictures")
    .exec((error, cart) => {
      if (error) return res.status(400).json({ error });
      if (cart) {
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
        res.status(200).json({ cartItems });
      }
    });
}

exports.removeCartItems = (req, res) => {
    const { productId } = req.body.removeItems;
    if (productId) {
      CartModel.updateOne(
        { user: req.user._id },
        {
          $pull: {
            cartItems: {
              product: productId,
            },
          },
        }
      ).exec((error, result) => {
        if (error) return res.status(400).json({ error });
        if (result) {
          res.status(202).json({ result });
        }
      });
    }
  };