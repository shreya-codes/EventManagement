import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controller/auth.controller";

const authRouter = Router();
authRouter.post("/signup", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);

export { authRouter };
