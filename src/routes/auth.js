import express from "express";
import { login, signUp, updateUser } from "../controllers/user/user.controller.js";
import { adminAuthenticateToken  } from "../middleware/authenticationToken.js";

const authRouter = express.Router();
    authRouter.post("/signup", signUp); 
    authRouter.post("/login", login);    
    authRouter.put("/:id", adminAuthenticateToken, updateUser);

export default authRouter;