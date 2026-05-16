import Verification from "../models/Verification.js";
import User from "../models/User.js";

import { createBankAccount } from "./account.service.js";

const fakeVerificationCheck = (
  number
) => {
  return number.length >= 10;
};

export const verifyBVN = async (
  userId,
  bvn
) => {
  const existing =
    await Verification.findOne({
      number: bvn,
    });

  if (existing) {
    throw new Error("BVN already used");
  }

  const valid =
    fakeVerificationCheck(bvn);

  if (!valid) {
    throw new Error("Invalid BVN");
  }

  const verification =
    await Verification.create({
      user: userId,
      type: "BVN",
      number: bvn,
      verified: true,
    });

  await User.findByIdAndUpdate(
    userId,
    {
      onboardingCompleted: true,
    }
  );

  const user = await User.findById(
    userId
  );

  const account =
    await createBankAccount(user);

  return {
    verification,
    account,
  };
};

export const verifyNIN = async (
  userId,
  nin
) => {
  const existing =
    await Verification.findOne({
      number: nin,
    });

  if (existing) {
    throw new Error("NIN already used");
  }

  const valid =
    fakeVerificationCheck(nin);

  if (!valid) {
    throw new Error("Invalid NIN");
  }

  const verification =
    await Verification.create({
      user: userId,
      type: "NIN",
      number: nin,
      verified: true,
    });

  await User.findByIdAndUpdate(
    userId,
    {
      onboardingCompleted: true,
    }
  );

  const user = await User.findById(
    userId
  );

  const account =
    await createBankAccount(user);

  return {
    verification,
    account,
  };
};