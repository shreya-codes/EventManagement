import jwt from "jsonwebtoken";
import { getUser } from "../repositories/userRepository";
import { ErrorMap } from "../constants/error.constants";
import { APIError } from "../error/error";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw new APIError(
        ErrorMap.BadRequestError("User"),
        `Authentication error `
      );
    }

    const decodedToken = jwt.verify(token, process.env.AUTH_SECRET);

    if (!decodedToken) {
      throw new APIError(
        ErrorMap.ValidationError("User"),
        "Invalid authentication token"
      );
    }

    const user = await getUser({ _id: decodedToken._id });

    if (user) {
      // Attach the user to the request for later use
      req.user = user;
      next();
    } else {
      throw new APIError(ErrorMap.NotFoundError("User"), `User not found  `);
    }
  } catch (error) {
    next(error);
  }
};

export { authMiddleware };
