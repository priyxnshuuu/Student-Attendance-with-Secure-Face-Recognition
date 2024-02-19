import {useMutation} from '@tanstack/react-query';
import {request} from '../../../../services/axios.service';
import {apiUrls} from '../../../api-urls';
import {IAttendanceInValues} from '../../../../form/initial-values/attendanceIn.values';

const markInAttendance = (data: IAttendanceInValues) => {
  return request({
    url: apiUrls.qr.IN_ATTENDANCE,
    method: 'POST',
    data: {
      attendanceType: 'IN',
      ...data,
    },
  });
};

export const useMarkInAttendanceMutation = () => {
  return useMutation(markInAttendance);
};
