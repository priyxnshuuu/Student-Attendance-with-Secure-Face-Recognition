import AdminUserModel from "./AdminModel";
import OtpModel from "./OtpModel";
import StudentUserModel from "./StudentModel";
import TokenModel from "./TokenModel";
import attendanceQrModel from "./attendanceQrModel";
import AttendanceSheetModel from "./attendanceSheetModel";
import settingsModel from "./settingModel";

export const models = {
  admin: AdminUserModel,
  token: TokenModel,
  student: StudentUserModel,
  otp: OtpModel,
  attendanceQr: attendanceQrModel,
  AttendanceSheet: AttendanceSheetModel,
  settingsModel: settingsModel,
};
