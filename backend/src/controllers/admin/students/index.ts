import { ActiveInactiveUser } from "./ActiveInactiveUser";
import { addStudent } from "./addStudent";
import { getAllStudent } from "./getAllStudent";
import { sendCredentials } from "./sendCredentials";
import { updateStudent } from "./updateStudent";

export const studentController = {
  addStudent: addStudent,
  updateStudent: updateStudent,
  ActiveInactiveUser: ActiveInactiveUser,
  getAllStudent: getAllStudent,
  sendCredentials: sendCredentials,
};
