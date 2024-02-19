import { useMutation } from "react-query";
import { TForgotIniValues } from "../../../form/initial-value/forgotPassword.values";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

const forgot = (data: TForgotIniValues) => {
  return request({
    url: apiUrls.FORGOT_ADMIN,
    method: "POST",
    data: data,
  });
};

export const useForgotPasswordAdmin = () => {
  return useMutation(forgot);
};
