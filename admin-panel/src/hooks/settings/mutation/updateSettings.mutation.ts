import { useMutation } from "react-query";
import { apiUrls } from "../../api-urls";
import { request } from "../../../services/axios.service";
import { TSettingsValues } from "../../../form/initial-value/settings.values";

const updateSettings = async (data: TSettingsValues) => {
  const response: TServerResponse = await request({
    url: apiUrls.UPDATE_SETTINGS,
    method: "POST",
    data: data,
  });
  return response;
};

export const useUpdateSettings = () => {
  return useMutation(updateSettings);
};
