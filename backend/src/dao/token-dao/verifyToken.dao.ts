import { logger } from "../../config/logger";

import TokenModel from "../../models/TokenModel";

export const verifyTokenDao = async (tokenKey: string) => {
  try {
    const token = await TokenModel.findOne({ token: tokenKey }).exec();

    return token;
  } catch (error) {
    logger.error(error);
  }
};
