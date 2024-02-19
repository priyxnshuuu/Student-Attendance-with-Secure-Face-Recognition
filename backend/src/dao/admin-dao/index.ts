import { createAdminDao } from "./createAdmin.dao";
import { getAdminByMobileOrEmail } from "./getAdminByMobileOrEmail.dao";
import { getUserByEmail } from "./getUserByEmail.dao";
import { getUserById } from "./getUserById.dao";

export const adminDao = {
  create: createAdminDao,
  getProfileByEmail: getUserByEmail,
  getProfileById: getUserById,
  adminByMobileOrEmail:getAdminByMobileOrEmail
};
