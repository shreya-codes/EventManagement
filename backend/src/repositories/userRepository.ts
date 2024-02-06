import { IUser, UserModel } from "../models/User.model";
import { APIError } from "../error/error";
import { ErrorMap } from "../constants/error.constants";

const insertUser = async (userData: IUser) => {
  const user = new UserModel({ ...userData });
  const newUser = await user.save();
  return newUser;
};

const getUser = async (selector = {}) => {
  const alreadyExistsUser = await UserModel.findOne({
    ...selector,
    deleted: { $ne: true },
  });

  if (!alreadyExistsUser) {
    return false;
  }
  return alreadyExistsUser;
};

export { insertUser, getUser };
