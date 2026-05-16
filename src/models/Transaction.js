import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },

    senderName: String,

    receiverName: String,

    senderAccountNumber: String,

    receiverAccountNumber: String,

    receiverBank: String,

    amount: {
      type: Number,
      required: true,
    },

    narration: {
      type: String,
      default: "Bank Transfer",
    },

    reference: {
      type: String,
      unique: true,
      required: true,
    },

    transactionType: {
      type: String,
      enum: ["INTRA_BANK", "INTER_BANK"],
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "SUCCESS",
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "Transaction",
  transactionSchema
);