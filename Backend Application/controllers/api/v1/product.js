
// model
const ProductModel = require("../../../models/product");

// create a product
exports.createProduct = (req, res) => {

  const { name, price, desc, qty } = req.body;

  let productPictures = [];

  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const product = new ProductModel({
    name: name,
    price,
    qty,
    desc,
    productPictures,
    createdBy: req.user._id,
  });

  product.save(((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      res.status(200).json({  "message" : "Product created succesfully" , product });
    }
  }));
};


// get products
exports.getProducts = (req,res)=>{
  const {id} = req.params;
  ProductModel.find({_id : id})
  .exec( (error , product) =>{
    if(error)
      return res.status(400).json( {  error } )
    if(product)
      res.status(200).json({ product });
  })
  
}