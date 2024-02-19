import { models } from "../../models";
import { TAdminModel } from "../../types/models/admin-model";

export const getUserById = (id: string) => {
  return models.admin.findOne({ _id: id });
};
