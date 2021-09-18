const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    
    cartItems: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            qty: { type: Number, default: 1 },
            
        }
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });


module.exports = mongoose.model('Cart', cartSchema);