import jwt from "jsonwebtoken";
import moment from "moment";
import { Config } from "../../config/Config";
import { logger } from "../../config/logger";
import { models } from "../../models";
import { TTokenModel } from "../../types/models/token-model";

export const generateAuthToken = async (data: Pick<TTokenModel, "userId">) => {
  try {
    const config = new Config();

    const tokenValue = jwt.sign(
      {
        data: data,
      },
      config.environmentVariable.jwtSecret,
      { expiresIn: "1days" }
    );

    const expiresIn = moment().add(1, "day");

    const inserted = await models.token.create({
      userId: data.userId,
      token: tokenValue,
      expiryDate: expiresIn,
    });

    return inserted;
  } catch (error) {
    logger.error(error);
  }
};
