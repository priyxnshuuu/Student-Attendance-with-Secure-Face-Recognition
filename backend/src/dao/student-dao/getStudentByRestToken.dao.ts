import { ObjectId } from "mongodb";
import { models } from "../../models";

export const getStudentByRestToken = (restToken: string) => {
  return models.student.findOne({ restToken: restToken });
};
