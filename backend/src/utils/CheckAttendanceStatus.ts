import moment from "moment";
import { CONSTANTS } from "../constants";
import { dao } from "../dao";

export const CheckAttendanceStatus = async () => {
  const settings = await dao.settings.getSettings();

  const inTime = new Date();
  let status: "late" | "on time" | "absent" = "absent";
  if (
    inTime >
    moment()
      .set("hour", settings?.checkIn ?? CONSTANTS.checkInTime)
      .toDate()
  ) {
    status = "late";
  } else if (
    inTime <=
    moment()
      .set("hour", settings?.checkIn ?? CONSTANTS.checkInTime)
      .toDate()
  ) {
    status = "on time";
  }
  return status;
};
