const ProductModel = require("../../../model/Product");
const { validationResult } = require("express-validator");

// function for creating a product
module.exports.createProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const data = await ProductModel.create(req.body);
    res.status(200).json({
      message: "Product created successfully!",
      data: data,
    });
  } catch (error) {
    console.log("Error in Creating Product!");
    res.sendStatus(500).json({ message: error.message });
  }
};

// function for getting all products
module.exports.getAllProduct = async (req, res) => {
  try {
    const data = await ProductModel.find({});
    res.status(200).json({
      message: "All Products",
      data: data,
    });
  } catch (error) {
    console.log("Error in fetching Product!");
    res.sendStatus(500).json({ message: error.message });
  }
};

// function for getting a product based on id
module.exports.getAProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await ProductModel.find({ _id: id });
    res.status(200).json({
      message: "Finding A Product",
      data: data,
    });
  } catch (error) {
    console.log("Error in fetching Product!");
    res.sendStatus(500).json({ message: error.message });
  }
};

// function for updating a product using findByIdAndUpdate
module.exports.updateProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    const updatedData = await ProductModel.findByIdAndUpdate(
      id,
       req.body ,
      { new: true }
    );
    res.status(200).json({
      message: "Product updated successfully!",
      data: updatedData,
    });
  } catch (error) {
    console.log("Error in updating Product!");
    res.sendStatus(500).json({ message: error.message });
  }
};


// function for deleting a product
module.exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteData = await ProductModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "Product Deleted Successfully!",
      data: deleteData,
    });
  } catch (error) {
    console.log("Error in deleting Product!");
    res.sendStatus(500).json({ message: error.message });
  }
};
