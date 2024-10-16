import { productsValidation } from "../../validations/joiSchema.js";
import Product from "../../model/Product.js"

//add Product
export const addProducts =  async (request, response) => {

    if(!request.user.isAdmin) {
        return response.status(403).json({message: "Doesn't have access"});
    }

    const { error, value } = productsValidation.validate(request.body);

    if(error) {
        return response.status(400).json({message: error});
    }

    let existingProduct;
    try {
        existingProduct = await Product.findOne({"productId": value?.productId})
    }
    catch (err) {
        return response.status(500).json({message: "Something went wrong"});
    }

    if(existingProduct) {
        return response.status(400).json({message: "Product Already exists"});
    }

    let addProducts = new Product(value);
    try {
        await addProducts.save();
    }
    catch (err) {
        return response.status(500).json({message: "Something went wrong"});
    }

    if(!addProducts) {
        return response.status(400).json({message: "Unable to add Product"}); 
    }

    return response.status(200).json({message: "Successfully Product Added", data: addProducts});
}

//get products
export const getProducts = async (request, response) => {
    let productsData = [];
    try {
        productsData = await Product.find();
    }
    catch (err) {
        return response.status(500).json({message:  "Something went wrong", success: false});
    }

    return response.status(200).json({message:  "Successfully fetched Product list", data: productsData, success: true});
}

//get products by id
export const getProductsByID = async (request, response) => {

    const { id } = request.params;
    let productsData = [];

    if(!id) {
        return response.status(400).json({message:  "Invalid ID", success: false});
    }

    try {
        productsData = await Product.findById(id);
    }
    catch (err) {
        return response.status(500).json({message:  "Something went wrong", success: false});
    }

    return response.status(200).json({message:  "Successfully fetched Product list", data: productsData, success: true});
}

//update Product
export const updateProduct = async (request, response) => {
    
    const { id } = request.params;
    const { price, size } = request.body;
    let existingProduct;
    let updateProduct;

    if(!id) {
        return response.status(400).json({message: "Add Product ID", success: false});
    }

    try {
        existingProduct = await Product.findById(id);
    }
    catch (err) {
        return response.status(500).json({message:  "Something went wrong", success: false});
    }

    if(!existingProduct) {
        return response.status(400).json({message:  "Enter valid Product Id", success: false});
    }

    try {
        updateProduct =  await Product.findByIdAndUpdate(id, {price, size}, {new: true})
    }
    catch (err) {
        return response.status(500).json({message:  "Something went wrong", success: false});
    }

    if(!updateProduct) {
        return response.status(500).json({message:  "Unable to Update", success: false}); 
    }

    return response.json({data: updateProduct, message: "Successfully Updated"}).status(200);

}

//delete Product
export const deleteProduct = async (request, response) => {
    const { id } = request.params;

    if(!id) {
        return response.status(404).json({message: "Product ID Not Found", success: false});
    }

    try {
        await Product.findByIdAndDelete(id);
    }
    catch(err) {
        return response.status(400).json({message: "Unable to Delete Product", success: false});
    }

    return response.status(200).json({message: "Successfully product deleted", success: false});
}