import {
  verifyBVN,
  verifyNIN,
} from "../services/onboarding.service.js";

export const verifyBVNController =
  async (req, res) => {
    try {
      const { bvn } = req.body;

      const result = await verifyBVN(
        req.user._id,
        bvn
      );

      return res.status(200).json({
        success: true,
        message:
          "BVN verification successful",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

export const verifyNINController =
  async (req, res) => {
    try {
      const { nin } = req.body;

      const result = await verifyNIN(
        req.user._id,
        nin
      );

      return res.status(200).json({
        success: true,
        message:
          "NIN verification successful",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };