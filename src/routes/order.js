import express from "express";
import { getOrder, postOrder, updateOrder } from "../controllers/orders/orders.controller.js";

const orderRouter = express.Router();
orderRouter.post("/", postOrder);
orderRouter.get("/:userId", getOrder);
orderRouter.put("/:userId", updateOrder);


export default orderRouter;