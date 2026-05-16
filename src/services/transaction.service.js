import mongoose from "mongoose";

import Account from "../models/Account.js";
import Transaction from "../models/Transaction.js";

import { generateReference } from "../utils/generateReference.js";

export const transferFunds = async ({
  userId,
  senderAccountNumber,
  receiverAccountNumber,
  receiverBank,
  amount,
  narration,
}) => {
  const session =
    await mongoose.startSession();

  session.startTransaction();

  try {
    const senderAccount =
      await Account.findOne({
        accountNumber:
          senderAccountNumber,
      }).session(session);

    if (!senderAccount) {
      throw new Error(
        "Sender account not found"
      );
    }

    if (
      senderAccount.user.toString() !==
      userId.toString()
    ) {
      throw new Error(
        "Unauthorized account access"
      );
    }

    if (
      senderAccount.balance < amount
    ) {
      throw new Error(
        "Insufficient balance"
      );
    }

    let receiverAccount = null;

    let transactionType =
      "INTER_BANK";

    if (
      receiverBank ===
      senderAccount.bankName
    ) {
      receiverAccount =
        await Account.findOne({
          accountNumber:
            receiverAccountNumber,
        }).session(session);

      if (!receiverAccount) {
        throw new Error(
          "Receiver account not found"
        );
      }

      transactionType =
        "INTRA_BANK";

      receiverAccount.balance +=
        Number(amount);

      await receiverAccount.save({
        session,
      });
    }

    senderAccount.balance -=
      Number(amount);

    await senderAccount.save({
      session,
    });

    const transaction =
      await Transaction.create(
        [
          {
            sender:
              senderAccount._id,

            receiver:
              receiverAccount?._id,

            senderName:
              senderAccount.accountName,

            receiverName:
              receiverAccount
                ?.accountName ||
              "External Beneficiary",

            senderAccountNumber:
              senderAccount.accountNumber,

            receiverAccountNumber,

            receiverBank,

            amount,

            narration,

            reference:
              generateReference(),

            transactionType,

            status: "SUCCESS",
          },
        ],
        { session }
      );

    await session.commitTransaction();

    session.endSession();

    return transaction[0];
  } catch (error) {
    await session.abortTransaction();

    session.endSession();

    throw error;
  }
};

export const getTransactionHistory =
  async (userId) => {
    const account =
      await Account.findOne({
        user: userId,
      });

    if (!account) {
      throw new Error(
        "Account not found"
      );
    }

    const transactions =
      await Transaction.find({
        sender: account._id,
      }).sort({
        createdAt: -1,
      });

    return transactions;
  };

export const getTransactionStatus =
  async (reference, userId) => {
    const account =
      await Account.findOne({
        user: userId,
      });

    if (!account) {
      throw new Error(
        "Account not found"
      );
    }

    const transaction =
      await Transaction.findOne({
        reference,
        sender: account._id,
      });

    if (!transaction) {
      throw new Error(
        "Transaction not found"
      );
    }

    return transaction;
  };