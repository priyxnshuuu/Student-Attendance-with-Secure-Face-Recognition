type TStudentAttendanceParams = {
  paging?: { page: number; itemPerPage: number };
  date?: null | Date;
  studentId: ObjectId;
};
