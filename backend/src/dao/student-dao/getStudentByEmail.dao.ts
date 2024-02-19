import { models } from "../../models";

export const getStudentByEmail = (email: string) => {
  const regx = new RegExp("^" + email + "$", "i");

  return models.student.findOne({ email: regx });
};
