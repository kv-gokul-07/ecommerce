import express from "express";
import { adminAuthenticateToken } from "../middleware/authenticationToken.js";
import { addProducts, deleteProduct, getProducts, getProductsByID, updateProduct } from "../controllers/products/products.controller.js";

const productRouter = express.Router();
productRouter.post("/", adminAuthenticateToken, addProducts);
productRouter.get("/", adminAuthenticateToken, getProducts);
productRouter.get("/:id", adminAuthenticateToken, getProductsByID);
productRouter.put("/:id", adminAuthenticateToken, updateProduct);
productRouter.delete("/:id", adminAuthenticateToken, deleteProduct);

export default productRouter;