import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const errorHandle = (error) => {
  if (error.code === "ERR_NETWORK") {
    toast.error("Network error");
    return redirect("/exp");
  }
  if (error.response.status === 401 || error.response.status === 403) {
    toast.error("Please login again!");
    return redirect("/login");
  }
  toast.error(error.response.data.message);
  return null;
};
