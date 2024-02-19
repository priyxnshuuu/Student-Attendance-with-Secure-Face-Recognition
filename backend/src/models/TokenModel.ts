import { ObjectId } from "mongodb";
import { TTokenModel } from "../types/models/token-model";
import { Model, Schema, model } from "mongoose";


const TokenSchema = new Schema<TTokenModel>(
  {
    token: String,
    expiryDate: Date,
    userId: ObjectId,
   
  },
  {
    timestamps: true,
  }
);

const TokenModel: Model<TTokenModel> = model("tokens", TokenSchema);

export default TokenModel;
