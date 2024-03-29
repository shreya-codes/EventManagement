import { Request, Response, NextFunction } from "express";
import {
  loginUserService,
  registerUserService,
} from "../services/auth.services";

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, user } = await registerUserService(req.body);
    res.cookie("token", token, { httpOnly: false });
    res.status(200).json({
      message: "User Registered successfully",
      success: true,
      user: { email: user.email, createdAt: user.createdAt },
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUserService(email, password);
    res.cookie("token", token, { httpOnly: false });
    res.status(201).json({
      message: "User signed in successfully",
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("token");
    res.status(201).send({
      message: "User signed out successfully",
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};
export { registerUser, loginUser, logoutUser };
