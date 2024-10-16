import express from "express";
import { getStats, getUser, signUp } from "../controllers/user/user.controller.js";

const userRouter = express.Router();
userRouter.get("/stats", getStats);
userRouter.get("/", getUser);    

export default userRouter;