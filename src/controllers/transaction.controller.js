import {
  transferFunds,
  getTransactionHistory,
  getTransactionStatus,
} from "../services/transaction.service.js";

export const transferFundsController =
  async (req, res) => {
    try {
      const transaction =
        await transferFunds({
          userId: req.user._id,
          ...req.body,
        });

      return res.status(200).json({
        success: true,
        message:
          "Transfer completed successfully",
        data: transaction,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

export const getTransactionHistoryController =
  async (req, res) => {
    try {
      const transactions =
        await getTransactionHistory(
          req.user._id
        );

      return res.status(200).json({
        success: true,
        data: transactions,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  };

export const getTransactionStatusController =
  async (req, res) => {
    try {
      const transaction =
        await getTransactionStatus(
          req.params.reference,
          req.user._id
        );

      return res.status(200).json({
        success: true,
        data: transaction,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  };
