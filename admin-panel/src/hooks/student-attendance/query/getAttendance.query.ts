import { useQuery } from "react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

const getStudentAttendance = async (params: TStudentAttendanceParams) => {
  const response: TServerResponse = await request({
    url: apiUrls.STUDENT_ATTENDANCE,
    method: "GET",
    params: {
      ...params.paging,
      date: params.date,
      StudentId: params.studentId,
    },
  });
  return response;
};

export const useGetStudentAttendance = (params: TStudentAttendanceParams) => {
  return useQuery(["attendance", params], () => getStudentAttendance(params));
};
