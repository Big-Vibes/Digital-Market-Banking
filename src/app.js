import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { protect } from "./middleware/auth.middleware.js";

import authRoutes from "./routes/auth.routes.js";
import onboardingRoutes from "./routes/onboarding.routes.js";
import accountRoutes from "./routes/account.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";


const app = express();

app.use(helmet());

app.use(cors({
  origin: "*",
  credentials: true,
}));

app.use(express.json());

app.use(cookieParser());

app.use(morgan("dev"));

app.get(
  "/api/protected",
  protect,
  (req, res) => {
    return res.json({
      success: true,
      message: "Protected route accessed",
      user: req.user,
    });
  }
);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "TS Academy Banking API Running",
  });
});

app.use("/api/auth", authRoutes);
app.use(
  "/api/onboarding",
  onboardingRoutes
);

app.use("/api/accounts", accountRoutes);

app.use(
  "/api/transactions",
  transactionRoutes
);

export default app;