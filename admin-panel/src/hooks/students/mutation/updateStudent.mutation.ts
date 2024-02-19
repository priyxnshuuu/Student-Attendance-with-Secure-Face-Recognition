import { useMutation } from "react-query";
import { apiUrls } from "../../api-urls";
import { TStudentValues } from "../../../form/initial-value/addStudent.values";
import { request } from "../../../services/axios.service";

const updateStudent = async (data:any) => {
  const response: TServerResponse = await request({
    url: apiUrls.UPDATE_STUDENT,
    method: "POST",
    data: data,
  });
  return response;
};

export const useUpdateStudent = () => {
  return useMutation(updateStudent);
};
