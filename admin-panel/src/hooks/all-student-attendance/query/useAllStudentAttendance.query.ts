import { useQuery } from "react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

const getAllStudentAttendance = async (params: TAttendanceParams) => {
  const response: TServerResponse = await request({
    url: apiUrls.ALL_STUDENT_ATTENDANCE,
    method: "GET",
    params: {
      ...params.paging,
    },
  });
  return response;
};

export const useGetAllStudentAttendance = (params: TAttendanceParams) => {
  return useQuery(["attendance", params], () => getAllStudentAttendance(params));
};
