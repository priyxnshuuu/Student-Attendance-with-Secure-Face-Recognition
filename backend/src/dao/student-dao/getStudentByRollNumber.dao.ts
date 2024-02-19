import { models } from "../../models";

export const getStudentByRollNumber = (rollNumber: string) => {
  return models.student.findOne({ rollNumber: rollNumber });
};
