import { useQuery } from "react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

const getAllStudent = async (params: TQueryParams) => {
  const response: TServerResponse = await request({
    url: apiUrls.GET_ALL_STUDENT,
    method: "GET",
    params: {
      ...params.paging,
      search: params.searchParams?.search,
      searchFieldNumber: ["mobile"],
      searchFieldString: ["name", "email"],
    },
  });
  return response;
};

export const useGetAllStudent = (params: TQueryParams) => {
  return useQuery(["admin", "all-student", params], () =>
    getAllStudent(params)
  );
};
