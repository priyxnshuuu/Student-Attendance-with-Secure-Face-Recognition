import {useMutation} from '@tanstack/react-query';
import {request} from '../../../../services/axios.service';
import {apiUrls} from '../../../api-urls';
import {IAttendanceOutValues} from '../../../../form/initial-values/attendanceOut.values';

const markOutAttendance = (data: IAttendanceOutValues) => {
  return request({
    url: apiUrls.qr.OUT_ATTENDANCE,
    method: 'POST',
    data: {
      attendanceType: 'OUT',
      ...data,
    },
  });
};

export const useMarkOutAttendanceMutation = () => {
  return useMutation(markOutAttendance);
};
