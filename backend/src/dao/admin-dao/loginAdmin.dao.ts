import { models } from "../../models";
import { TAdminModel } from "../../types/models/admin-model";



export const loginAdminDao =  (data: string) => {
  return  models.admin.findOne({ email: data});

};
