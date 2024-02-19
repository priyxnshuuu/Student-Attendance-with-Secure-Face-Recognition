import { models } from "../../models";

export const addRollNo = async (data: string) => {
  const studentCount = await models.student.countDocuments().exec();
  const sum = studentCount + 1;
  const rollNo = "STU" + data.substring(0, 3).toUpperCase() + sum;
  return rollNo;
};
