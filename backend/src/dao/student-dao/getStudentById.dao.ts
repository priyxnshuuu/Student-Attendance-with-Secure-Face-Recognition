import { ObjectId } from "mongodb";
import { models } from "../../models";

export const getStudentById = (id: string | ObjectId) => {
  return models.student.findOne({ _id: id });
};
