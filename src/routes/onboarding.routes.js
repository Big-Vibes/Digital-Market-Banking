import express from "express";

import { protect } from "../middleware/auth.middleware.js";

import {
  verifyBVNController,
  verifyNINController,
} from "../controllers/onboarding.controller.js";

const router = express.Router();

router.post(
  "/verify-bvn",
  protect,
  verifyBVNController
);

router.post(
  "/verify-nin",
  protect,
  verifyNINController
);

export default router;