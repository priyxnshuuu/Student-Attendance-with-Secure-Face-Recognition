import { models } from "../../models";

export const getToken = (token: string) => {
  return models.token.findOne({ token: token });
};
