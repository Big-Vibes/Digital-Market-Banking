import express from "express";

import { protect } from "../middleware/auth.middleware.js";

import {
  transferFundsController,
  getTransactionHistoryController,
  getTransactionStatusController,
} from "../controllers/transaction.controller.js";

const router = express.Router();

router.post(
  "/transfer",
  protect,
  transferFundsController
);

router.get(
  "/history",
  protect,
  getTransactionHistoryController
);

router.get(
  "/status/:reference",
  protect,
  getTransactionStatusController
);

export default router;
