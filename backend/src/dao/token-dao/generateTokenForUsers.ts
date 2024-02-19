import jwt from "jsonwebtoken";
import moment from "moment";
import { Config } from "../../config/Config";
import { logger } from "../../config/logger";
import TokenModel from "../../models/TokenModel";

export const generateTokenForUsers = async (data: any) => {
  try {
    const config = new Config();

    const tokenValue = jwt.sign(
      {
        data: data,
      },
      config.environmentVariable.jwtSecret
    );

    const expiresIn = moment().add(1, "day");

    const Token = new TokenModel({
      userId: data._id,
      role: data.role,
      token: tokenValue,
      expiryDate: expiresIn,
    });
    const inserted = await Token.save();
    return inserted;
  } catch (error) {
    logger.error(error);
  }
};
