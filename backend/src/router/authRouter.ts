import { Router } from "express";
import { registerUser, loginUser } from "../controller/auth.controller";
import { authMiddleware } from "../middleware/authMiddleware";

const authRouter = Router();
authRouter.use(authMiddleware);
authRouter.post("/signup", registerUser);
authRouter.post("/login", loginUser);

export { authRouter };
