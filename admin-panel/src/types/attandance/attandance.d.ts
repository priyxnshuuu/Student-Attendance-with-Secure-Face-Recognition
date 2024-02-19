type TAttendanceData = {
  StudentId: ObjectId;
  Name: string;
  Date: string;
  InTime: string;
  outTime: Date;
  notes?: string;
  Status: string;
  createdAt: Date;
};
