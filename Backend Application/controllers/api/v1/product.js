
// model
const ProductModel = require("../../../models/product");

// create a product
exports.createProduct = async (req, res) => {

  try{
  const { name, price, desc, qty } = await req.body;

  let productPictures = [];

  if (req.files.length > 0) {
    productPictures = await req.files.map((file) => {
     
      return { img: file.filename };
    });
  }

  const product = await ProductModel.create({
    name: name,
    price,
    qty,
    desc,
    productPictures,
    createdBy: req.user._id,
  });

    return res.status(200).json({  "message" : "Product created succesfully" , product });
    

  }
  catch (error) {
    return res.status(400).json({ message: error.message });
  }

  }


// get products
exports.getProducts = async (req,res)=>{

  try {
  const {id} = req.params;
  const product = await ProductModel.find({_id : id})

    if(product.length> 0 )
      res.status(200).json({ product });
    else{
      res.status(200).json({message : "Product not found!"});
    }
}
catch (error) {
  return res.status(400).json({ message: error.message });
}
  
}