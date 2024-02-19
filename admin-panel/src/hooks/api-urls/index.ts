import { authUrls } from "./auth.url";
import { studentUrls } from "./student.url";
import { attendanceUrls } from "./attendance.url";
import { settingsUrl } from "./settings.url";

export const apiUrls = {
  ...authUrls,
  ...studentUrls,
  ...attendanceUrls,

  ...settingsUrl,
};
