import { Document, Model, model, Schema } from "mongoose";
import { TAdminModel } from "../types/models/admin-model";

const AdminUserSchema = new Schema<TAdminModel>(
  {
    name: String,
    email: {
      type: String,
      required: true,
    },
    mobile: Number,
    password: {
      type: String,
      required: true,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const AdminUserModel: Model<TAdminModel> = model(
  "admin-users",
  AdminUserSchema
);

export default AdminUserModel;
