import { models } from "../../models";
import bcrypt from "bcryptjs";
import { TAdminModel } from "../../types/models/admin-model";

export const createAdminDao = async (
  data: Pick<TAdminModel, "email" | "name" | "mobile" | "password">
) => {
  data.password = await bcrypt.hash(data.password, 10);
  return models.admin.create(data);
};
