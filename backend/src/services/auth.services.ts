// auth.services.ts
import { IUser } from "../models/User.model";
import { insertUser, getUser } from "../repositories/userRepository";
import { signJwt } from "../services/jwt.services";
import bcrypt from "bcrypt";

const registerUserService = async (userData: IUser) => {
  try {
    const existingUser = await getUser({ email: userData.email });
    if (existingUser) {
      throw new Error(`User already exists with email ${userData.email}`);
    }
    const user = await insertUser(userData);
    const token = await signJwt(user._id.toString());
    return { token, user };
  } catch (error) {
    throw new Error(`Could not register user: ${error.message}`);
  }
};

const loginUserService = async (email: string, password: string) => {
  try {
    const user = await findByCredentials(email, password);
    if (!user) {
      throw new Error("User not found");
    }
    const token = await signJwt(user._id.toString());

    return { user: { email }, token };
  } catch (error) {
    throw new Error(`Could not login user: ${error.message}`);
  }
};

const findByCredentials = async (email: string, password: string) => {
  try {
    const user = await getUser({ email });
    if (!user) {
      throw new Error(`User with email ${email} does not exist`);
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error("Incorrect Password");
    }
    return user;
  } catch (error) {
    throw new Error(`Error finding user by credentials: ${error.message}`);
  }
};

export { registerUserService, loginUserService, findByCredentials };
