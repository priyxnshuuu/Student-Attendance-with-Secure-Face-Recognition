import { addRollNo } from "./addRollNo.dao";
import { addStudentDao } from "./addStudent.dao";
import { generateRestToken } from "./generateRestToken";
import { getAllStudent } from "./getAllStudent.dao";
import { getAllStudentList } from "./getAllStudentList.dao";
import { getStudentByEmail } from "./getStudentByEmail.dao";
import { getStudentById } from "./getStudentById.dao";
import { getStudentByMobileOrEmail } from "./getStudentByMobileOrEmail.dao";
import { getStudentByRestToken } from "./getStudentByRestToken.dao";
import { getStudentByRollNumber } from "./getStudentByRollNumber.dao";
import { updateStudent } from "./updateStudent";

export const studentDao = {
  addStudent: addStudentDao,
  getProfileByEmail: getStudentByEmail,
  updateStudent: updateStudent,
  userByMobileAndEmail: getStudentByMobileOrEmail,
  GetStudentByRollNumber: getStudentByRollNumber,
  getAllStudent: getAllStudent,
  getStudentById: getStudentById,
  addRollNo: addRollNo,
  getAllStudentList: getAllStudentList,
  generateRestToken: generateRestToken,
  getStudentByRestToken: getStudentByRestToken,
};
