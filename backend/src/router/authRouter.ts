import { Router } from "express";
// import { createAccount, login } from '../controllers/authController.js';

const authRouter = Router();

authRouter.post("/signup");
authRouter.post("/login");

export { authRouter };
