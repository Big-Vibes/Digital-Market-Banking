import mongoose from "mongoose";

const verificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["BVN", "NIN"],
      required: true,
    },

    number: {
      type: String,
      required: true,
      unique: true,
    },

    verified: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "Verification",
  verificationSchema
);