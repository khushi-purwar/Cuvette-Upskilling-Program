const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true
    },
    price: { 
        type: Number, 
        required: true 
    },
    qty: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    productPictures: [
        { img: { type: String } }
    ],

 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },


}, { timestamps: true });


module.exports = mongoose.model('Product', productSchema);