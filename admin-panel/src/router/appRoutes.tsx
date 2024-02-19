import Dashboard from "../pages/dashboard/Index";
import ForgotPass from "../pages/forgot-password/Index";
import Login from "../pages/logIn/Index";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../protected-route/ProtectedRoute";
import Students from "../pages/students/Index";
import ResetPassword from "../pages/reset-password/Index";
import ErrorPage from "../pages/error-page/Index";
import AllStudentAttendance from "../pages/all-student-attendance/Index";
import StudentAttendance from "../pages/student-attendance/Index";
import Settings from "../pages/settings";

export const router = createBrowserRouter([
  {
    path: "/forgot-password",
    element: <ForgotPass />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },

  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "students",
        element: <Students />,
      },
      {
        path: "attendance",
        element: <AllStudentAttendance />,
      },
      {
        path: "attendance/:userId",
        element: <StudentAttendance />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);
