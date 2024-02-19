import { useMutation } from "react-query";
import { TResetIniValues } from "../../../form/initial-value/Reset.values";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

const reset = (data: TResetIniValues) => {
  const queryParameters = new URLSearchParams(document.location.search);
  const token = queryParameters.get("token");
  return request({
    url: `${apiUrls.RESET_PASS_ADMIN}?token=${token}`,
    method: "POST",
    data: {
      password: data.pass1,
    },
  });
};

export const useResetPasswordAdmin = () => {
  return useMutation(reset);
};
