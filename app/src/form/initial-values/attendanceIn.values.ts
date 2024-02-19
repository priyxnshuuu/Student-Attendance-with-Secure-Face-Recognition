export type IAttendanceInValues = {
  qrString: string;
  note?: string;
};

export const attendanceInInitialValues: IAttendanceInValues = {
  qrString: '',
  note: '',
};
