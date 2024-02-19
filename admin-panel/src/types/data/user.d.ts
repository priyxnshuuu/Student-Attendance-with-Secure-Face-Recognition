type TStudentData = {
  _id?: string;
  email: string;
  name: string;
  password: string;
  mobile: string;
  rollNumber: string;
  blocked?: boolean;
};
type TStudentHeaderData = {
  totalAttendance: number;
  percentageOnTime: number;
  percentageAbsent: number;
  percentageLate: number;
  name: string;
  email: string;
};
