import {
  getMyAccount,
  getAccountBalance,
  nameEnquiry,
} from "../services/account.service.js";

export const getMyAccountController =
  async (req, res) => {
    try {
      const account =
        await getMyAccount(
          req.user._id
        );

      return res.status(200).json({
        success: true,
        data: account,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  };

export const getBalanceController =
  async (req, res) => {
    try {
      const balance =
        await getAccountBalance(
          req.user._id
        );

      return res.status(200).json({
        success: true,
        data: balance,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  };

export const nameEnquiryController =
  async (req, res) => {
    try {
      const result =
        await nameEnquiry(
          req.params.accountNumber
        );

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  };