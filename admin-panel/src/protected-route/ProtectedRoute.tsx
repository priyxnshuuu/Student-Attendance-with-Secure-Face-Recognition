import Layout from "../container/appshell/Index";
import { useIsAuthenticated } from "react-auth-kit";
const ProtectedRoute = () => {
  const isAuthenticated = useIsAuthenticated();
  if (!isAuthenticated()) {
    window.location.replace("/login");
  }
  return <Layout />;
};
export default ProtectedRoute;
