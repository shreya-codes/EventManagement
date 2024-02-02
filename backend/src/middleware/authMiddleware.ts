import jwt from "jsonwebtoken";
import { getUser } from "../repositories/userRepository";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw new Error("Authentication token is missing");
    }

    const decodedToken = jwt.verify(token, process.env.AUTH_SECRET);

    if (!decodedToken) {
      throw new Error("Invalid authentication token");
    }

    const user = await getUser({ _id: decodedToken._id });

    if (user) {
      // Attach the user to the request for later use
      req.user = user;
      next();
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error(`Authentication Error: ${error.message}`);
    res.status(401).json({ error: "Authentication failed" });
  }
};

export { authMiddleware };
