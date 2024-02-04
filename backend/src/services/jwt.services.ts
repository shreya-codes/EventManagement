import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

const signJwt = (id: string) => {
  return jwt.sign({ _id: id }, process.env.AUTH_SECRET as string, {
    expiresIn: `${process.env.AUTH_TOKEN_EXPIRY_DAYS as string} days`,
  });
};

const decodeJwt = (jwt: string) => {
  return jwtDecode(jwt);
};

export { signJwt, decodeJwt };
