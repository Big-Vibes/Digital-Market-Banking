import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || 4000,
  mongoURI: process.env.MONGO_URI,

  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,

  accessTokenExpires:
    process.env.ACCESS_TOKEN_EXPIRES || "15m",

  refreshTokenExpires:
    process.env.REFRESH_TOKEN_EXPIRES || "7d",

  bankName:
    process.env.BANK_NAME || "TS Academy Bank",

  openingBalance:
    Number(process.env.DEFAULT_OPENING_BALANCE) || 15000,
};