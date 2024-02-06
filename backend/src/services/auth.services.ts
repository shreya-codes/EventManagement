// auth.services.ts
import { IUser } from "../models/User.model";
import { insertUser, getUser } from "../repositories/userRepository";
import { signJwt } from "../services/jwt.services";
import bcrypt from "bcrypt";
import { APIError } from "../error/error";
import { ErrorMap } from "../constants/error.constants";

const registerUserService = async (userData: IUser) => {
  const existingUser = await getUser({ email: userData.email });
  if (existingUser) {
    throw new APIError(
      ErrorMap.NotFoundError("User"),
      `User already exists with email${userData.email} `
    );
  }
  const user = await insertUser(userData);
  const token = await signJwt(user._id.toString());
  return { token, user };
};

const loginUserService = async (email: string, password: string) => {
  const user = await findByCredentials(email, password);
  if (!user) {
    throw new APIError(
      ErrorMap.NotFoundError("User"),
      `Could not find user with email${email}} `
    );
  }
  const token = await signJwt(user._id.toString());

  return { user: { email }, token };
};

const findByCredentials = async (email: string, password: string) => {
  const user = await getUser({ email });
  if (!user) {
    throw new APIError(
      ErrorMap.NotFoundError("User"),
      `Could not find user with email${email}} `
    );
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Incorrect Password");
  }
  return user;
};

export { registerUserService, loginUserService, findByCredentials };
