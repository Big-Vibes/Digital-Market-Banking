import express from "express";

import { protect } from "../middleware/auth.middleware.js";

import {
  getMyAccountController,
  getBalanceController,
  nameEnquiryController,
} from "../controllers/account.controller.js";

const router = express.Router();

router.get(
  "/me",
  protect,
  getMyAccountController
);

router.get(
  "/balance",
  protect,
  getBalanceController
);

router.get(
  "/name-enquiry/:accountNumber",
  protect,
  nameEnquiryController
);

export default router;