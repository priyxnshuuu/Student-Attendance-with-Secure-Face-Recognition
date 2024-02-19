import { useMutation } from "react-query";
import { TLoginIniValues } from "../../../form/initial-value/login.values";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

const login = (data: TLoginIniValues) => {
  return request({
    url: apiUrls.LOGIN,
    method: "POST",
    data: data,
  });
};

export const useLoginMutation = () => {
  return useMutation(login);
};
