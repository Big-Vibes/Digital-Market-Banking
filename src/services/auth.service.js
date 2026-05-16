import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import RefreshToken from "../models/RefreshToken.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";

import { env } from "../config/env.js";

export const registerUser = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  return user;
};

export const loginUser = async ({
  email,
  password,
}) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordCorrect =
    await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken(user);

  const refreshToken = generateRefreshToken(user);

  const decoded = jwt.decode(refreshToken);

  await RefreshToken.create({
    user: user._id,
    token: refreshToken,
    expiresAt: new Date(decoded.exp * 1000),
  });

  return {
    user,
    accessToken,
    refreshToken,
  };
};

export const refreshUserToken = async (
  refreshToken
) => {
  if (!refreshToken) {
    throw new Error("Refresh token required");
  }

  const existingToken =
    await RefreshToken.findOne({
      token: refreshToken,
    });

  if (!existingToken) {
    throw new Error("Invalid refresh token");
  }

  const decoded = jwt.verify(
    refreshToken,
    env.jwtRefreshSecret
  );

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new Error("User not found");
  }

  await RefreshToken.deleteOne({
    _id: existingToken._id,
  });

  const newAccessToken =
    generateAccessToken(user);

  const newRefreshToken =
    generateRefreshToken(user);

  const newDecoded = jwt.decode(
    newRefreshToken
  );

  await RefreshToken.create({
    user: user._id,
    token: newRefreshToken,
    expiresAt: new Date(
      newDecoded.exp * 1000
    ),
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

export const logoutUser = async (
  refreshToken
) => {
  await RefreshToken.deleteOne({
    token: refreshToken,
  });

  return true;
};