import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    env.jwtAccessSecret,
    {
      expiresIn: env.accessTokenExpires,
    }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    env.jwtRefreshSecret,
    {
      expiresIn: env.refreshTokenExpires,
    }
  );
};