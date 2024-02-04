import { IUser, UserModel } from "../models/User.model";

const insertUser = async (userData: IUser) => {
  try {
    const user = new UserModel({ ...userData });
    const newUser = await user.save();
    return newUser;
  } catch (error) {
    throw new Error(`Could not insert user: ${error.message}`);
  }
};

const getUser = async (selector = {}) => {
  try {
    const alreadyExistsUser = await UserModel.findOne({
      ...selector,
      deleted: { $ne: true },
    });

    if (!alreadyExistsUser) {
      return false;
    }
    return alreadyExistsUser;
  } catch (error) {
    throw new Error(`Could not get user: ${error.message}`);
  }
};

export { insertUser, getUser };
