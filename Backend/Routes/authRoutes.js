import express from "express";
import { loginController,registerController,logoutController } from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post("/register",registerController);
authRouter.post("/login",loginController);
authRouter.post("/logout",logoutController);

export {authRouter};