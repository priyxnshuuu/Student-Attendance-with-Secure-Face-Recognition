import jwt from "jsonwebtoken";
import moment from "moment";
import { Config } from "../../config/Config";
import { logger } from "../../config/logger";
import TokenModel from "../../models/TokenModel";
import { models } from "../../models";
import { TStudentModel } from "../../types/models/student-model";
import { ObjectId } from "mongodb";

export const generateRestToken = async (_id: ObjectId) => {
  try {
    const config = new Config();

    const restToken = jwt.sign(
      {
        data: {},
      },
      config.environmentVariable.jwtSecret,
      { expiresIn: "1days" }
    );

    const inserted = await models.student.updateOne(
      { _id: _id },
      { $set: { restToken: restToken } }
    );

    return inserted;
  } catch (error) {
    logger.error(error);
  }
};
