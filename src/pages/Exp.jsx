import React from "react";

import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { UserCutiReportList } from "../components";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { redirect, useLoaderData } from "react-router-dom";

export const loader =
  (store) =>
  async ({ request }) => {
    const user = store.getState().userState.user;
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    try {
      const response = await customFetch.get("/cuti/search", {
        params,
        headers: {
          "X-API-TOKEN": `${user.token}`,
        },
      });

      return {
        cuti: response.data.data,
        pagination: response.data.pagination,
      };
    } catch (error) {
      console.log(error);
      toast.warn("Terjadi error!");
      return redirect("/login");
    }
  };
export const action =
  (store) =>
  async ({ request }) => {
    const user = store.getState().userState.user;
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const id = data.id;
    try {
      const response = await customFetch.patch(`/kops/${id}`, data, {
        headers: {
          "X-API-TOKEN": user.token,
        },
      });

      toast.success(response.data.message || "Success");

      return null;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Terjadi error");

      return null;
    }
  };
const Exp = () => {
  return <UserCutiReportList />;
};
export default Exp;
