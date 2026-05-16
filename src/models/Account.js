import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    accountName: {
      type: String,
      required: true,
    },

    accountNumber: {
      type: String,
      required: true,
      unique: true,
    },

    bankName: {
      type: String,
      default: "TS Academy Bank",
    },

    balance: {
      type: Number,
      default: 15000,
    },

    currency: {
      type: String,
      default: "NGN",
    },

    status: {
      type: String,
      enum: ["ACTIVE", "SUSPENDED"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "Account",
  accountSchema
);