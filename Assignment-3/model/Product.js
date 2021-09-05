const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type: String
    },
    category : {
        type: String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    qty : {
        type:Number,
        default: 1
    }
}, {timestamps : true})

const productModel = mongoose.model("Product" , productSchema);

module.exports = productModel;