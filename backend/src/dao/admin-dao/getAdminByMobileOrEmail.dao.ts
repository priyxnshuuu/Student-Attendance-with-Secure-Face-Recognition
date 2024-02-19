import { models } from "../../models";

export const getAdminByMobileOrEmail = (email: string, mobile: number) => {
  return models.admin.findOne({
    $or: [{ email: email }, { mobile: mobile }],
  });
};
