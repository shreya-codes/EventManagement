import { Request } from "express";
import passport from "passport";
import { Strategy as JwtStrategy, StrategyOptions } from "passport-jwt";
import { getUser } from "../repositories/userRepository";

const cookieExtractor = (req: Request) => req.cookies["access-token"];

const jwtOptions: StrategyOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.AUTH_SECRET,
};

const jwtVerify = async (jwt_payload, done) => {
  try {
    const user = await getUser({
      _id: jwt_payload._id,
      deleted: { $ne: true },
    });

    if (user) {
      return done(null, user);
    } else {
      return done(new Error("User not found"), false);
    }
  } catch (error) {
    return done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

passport.use("jwt", jwtStrategy);
