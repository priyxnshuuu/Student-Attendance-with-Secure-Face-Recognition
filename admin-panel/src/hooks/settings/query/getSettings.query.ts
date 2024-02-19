import { useQuery } from "react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

const getSettings = async () => {
  const response: TServerResponse = await request({
    url: apiUrls.GET_SETTINGS,
    method: "GET",
  });
  return response;
};

export const useGetSettings = () => {
  return useQuery(["admin", "all-settings"], () => getSettings());
};
