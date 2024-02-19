import {useQuery} from '@tanstack/react-query';
import {request} from '../../../services/axios.service';
import {apiUrls} from '../../api-urls';

const getStudentAttendance = async (params: TStudentAttendanceParams) => {
  const response: TServerResponse = await request({
    url: apiUrls.students.STUDENT_ATTENDANCE,
    method: 'GET',
    params: {
      ...params,
    },
  });
  return response;
};

export const useStudentAttendanceQuery = (params: TStudentAttendanceParams) => {
  return useQuery(['user', 'check-attendance', params], () =>
    getStudentAttendance(params),
  );
};
