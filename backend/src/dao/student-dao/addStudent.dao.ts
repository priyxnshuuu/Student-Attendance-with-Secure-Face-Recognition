import { models } from "../../models";
import bcrypt from "bcryptjs";
import { TStudentModel } from "../../types/models/student-model";

export const addStudentDao = async (
  data: Pick<
    TStudentModel,
    "email" | "name" | "mobile" | "password" | "rollNumber" | "photo"
  >
) => {
  data.password = await bcrypt.hash(data.password, 10);
  return models.student.create(data);
};
