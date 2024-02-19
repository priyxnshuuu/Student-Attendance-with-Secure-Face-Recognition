import { ValidationError } from "express-validator";

export const errorFormatter = ({ msg, param }: ValidationError) => {
  return {
    body: param,
    error: msg,
  };
};
