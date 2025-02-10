import { Navigate, Outlet } from "react-router-dom";
import getCookie from "../../utils/get-cookie";

const ProtectedRoute = ({children}) => {
  const auth = getCookie('fetch-access');
  return auth ? children || <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
