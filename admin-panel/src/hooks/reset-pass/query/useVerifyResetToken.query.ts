import { useQuery } from "react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

const getVerifyToken = async () => {
  const queryParameters = new URLSearchParams(document.location.search);
  const token = queryParameters.get("token");
  const response: TServerResponse = await request({
    url: apiUrls.VERIFY,
    method: "GET",
    params: {
      token: token,
    },
  });

  return response;
};

export const useGetVerifyToken = () => {
  return useQuery("data", getVerifyToken);
};
