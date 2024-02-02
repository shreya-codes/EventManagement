import { Router } from "express";
import { registerUser, loginUser } from "../controller/auth.controller";

const authRouter = Router();

authRouter.post("/signup", registerUser);
authRouter.post("/login", loginUser);

export { authRouter };
