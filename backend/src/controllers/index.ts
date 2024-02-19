import { adminControllers } from "./admin";
import { IndexController } from "./index.controller";
import { userAttendance } from "./user";

export const controllers = {
  IndexController: IndexController,
  adminControllers: adminControllers,
  userAttendance: userAttendance,
};
