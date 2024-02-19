import { ObjectId } from "mongodb";
import { models } from "../../models";
import { TStudentModel } from "../../types/models/student-model";

export const updateStudent = async (data: Partial<TStudentModel>) => {
  return models.student.updateOne({ _id: data._id }, { $set: data });
};
