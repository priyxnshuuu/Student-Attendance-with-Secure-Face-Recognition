type TStudentAttendance = {
  _id: string;
  inTime: Date;
  outTime: Date;
  notes: string;
  createdAt: string;
  status: 'late' | 'on time' | 'absent';
};

type TStudentHeaderData = {
  totalAttendance: number;
  percentageOnTime: number;
  percentageAbsent: number;
  percentageLate: number;
  name: string;
  email: string;
};

type TStudentAttendanceParams = {
  date?: Date | null;
};
