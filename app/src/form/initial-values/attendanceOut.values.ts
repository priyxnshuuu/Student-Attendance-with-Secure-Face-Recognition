export type IAttendanceOutValues = {
  qrString: string;
  notes?: string;
};

export const attendanceInInitialValues: IAttendanceOutValues = {
  qrString: '',
  notes: '',
};
