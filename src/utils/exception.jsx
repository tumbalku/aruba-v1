import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { redirect } from "react-router-dom";
import { store } from "../store";
import { clearUser } from "../features/user/userSlice";

export const errorHandleForAction = (error, popup = "") => {
  const msg =
    error.response?.data?.message ||
    "Terjadi kesalahan pada perintah yang anda berikan!";

  if (error.code === "ERR_NETWORK") {
    toast.error("Network error");
    return redirect("/exp");
  }

  if (error.response.status === 401 || error.response.status === 403) {
    toast.error("Silahkan login terlebih dahulu");
    store.dispatch(clearUser());
    return redirect("/login");
  }

  if (popup === "toastify") {
    toast.error(msg);
    return null;
  }

  Swal.fire({
    title: "Error",
    text: msg,
    icon: "error",
    confirmButtonColor: "#d33",
    confirmButtonText: "OK",
  });
  return null;
};

export const errorHandleForFunction = (error, navigate, popup = "") => {
  const msg =
    error.response?.data?.message ||
    "Terjadi kesalahan pada perintah yang anda berikan!";

  if (error.code === "ERR_NETWORK") {
    toast.error("Network error");
    navigate("/exp");
    return;
  }

  if (error.response?.status === 401 || error.response?.status === 403) {
    toast.error("Silahkan login terlebih dahulu");
    store.dispatch(clearUser());
    navigate("/login");
    return;
  }

  if (popup === "toastify") {
    toast.error(msg);
    return;
  }

  Swal.fire({
    title: "Error",
    text: msg,
    icon: "error",
    confirmButtonColor: "#d33",
    confirmButtonText: "OK",
  });
};
