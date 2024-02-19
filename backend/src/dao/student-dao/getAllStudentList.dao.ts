import { models } from "../../models";

export const getAllStudentList = () => {
  return models.student.find();
};
