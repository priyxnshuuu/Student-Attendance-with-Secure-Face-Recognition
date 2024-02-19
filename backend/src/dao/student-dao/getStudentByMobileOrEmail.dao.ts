import { models } from "../../models";

export const getStudentByMobileOrEmail = (email: string, mobile: number) => {
  return models.student.findOne({
    $or: [{ email: email }, { mobile: mobile }],
  });
};
