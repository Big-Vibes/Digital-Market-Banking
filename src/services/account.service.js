import Account from "../models/Account.js";
import { env } from "../config/env.js";
import { generateAccountNumber } from "../utils/generateAccountNumber.js";

export const createBankAccount = async (
  user
) => {
  const existingAccount =
    await Account.findOne({
      user: user._id,
    });

  if (existingAccount) {
    return existingAccount;
  }

  const accountNumber =
    generateAccountNumber();

  const accountName =
    `${user.firstName} ${user.lastName}`;

  const account = await Account.create({
    user: user._id,
    accountName,
    accountNumber,
    balance: env.openingBalance,
    bankName: env.bankName,
  });

  return account;
};

export const getMyAccount = async (
  userId
) => {
  const account = await Account.findOne({
    user: userId,
  });

  if (!account) {
    throw new Error("Account not found");
  }

  return account;
};

export const getAccountBalance = async (
  userId
) => {
  const account = await Account.findOne({
    user: userId,
  });

  if (!account) {
    throw new Error("Account not found");
  }

  return {
    balance: account.balance,
    currency: account.currency,
  };
};

export const nameEnquiry = async (
  accountNumber
) => {
  const account = await Account.findOne({
    accountNumber,
  });

  if (!account) {
    throw new Error("Recipient account not found");
  }

  return {
    accountName: account.accountName,
    accountNumber: account.accountNumber,
    bankName: account.bankName,
  };
};