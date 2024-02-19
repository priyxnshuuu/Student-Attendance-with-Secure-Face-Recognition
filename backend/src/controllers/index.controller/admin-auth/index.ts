import { createAdminUser } from "./createAdminUser";
import { forgotPasswordAdmin } from "./forgotPasswordAdmin";
import { getAdminProfile } from "./getAdminProfile";
import { loginAdminUser } from "./loginAdmin";
import { resetPassAdmin } from "./resetPassAdmin";
import { verifyResetLink } from "./verifyResetLink";

export const adminAuthController = {
  create: createAdminUser,
  login: loginAdminUser,
  forgotPassword: forgotPasswordAdmin,
  resetPassword: resetPassAdmin,
  adminProfile: getAdminProfile,
  verifyResetLink: verifyResetLink,
};
