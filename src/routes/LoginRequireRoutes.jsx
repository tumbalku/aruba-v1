import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const LoginRequireRoutes = () => {
  const user = useSelector((state) => state.userState.user);
  const location = useLocation();

  if (!user) {
    toast.warn("Silahkan Login terlebih dahulu");

    return (
      <Navigate to={`/login?redirect=${location.pathname}${location.search}`} />
    );
  }

  return <Outlet />;
};

export default LoginRequireRoutes;
