import { models } from "../../models";

export const getUserByEmail = (email: string) => {
  const regx = new RegExp("^" + email + "$", "i");

  return models.admin.findOne({ email: regx });
};
