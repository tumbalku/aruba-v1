import React from "react";
import { customFetch } from "../../utils";
import { toast } from "react-toastify";

import { UpdateSingleUser } from "../../components";
import { redirect } from "react-router-dom";
export const loader =
  (store) =>
  async ({ params }) => {
    const user = store.getState().userState.user;

    try {
      const [resUser, resAddresses] = await Promise.all([
        customFetch(`users/${params.id}`, {
          headers: {
            "X-API-TOKEN": user.token,
          },
        }),
        customFetch(`/addresses`),
      ]);

      return {
        userDetail: resUser.data.data,
        addresses: resAddresses.data.data,
      };
    } catch (error) {
      console.log(error);
      toast.warn("Terjadi error!");
      return null;
    }
  };

export const action =
  (store) =>
  async ({ request, params }) => {
    try {
      const formData = await request.formData();
      if (!formData) {
        throw new Error("Form data is missing");
      }

      const data = Object.fromEntries(formData);
      const user = store.getState().userState.user;

      const { group, rank, position, workUnit, ...rest } = data;
      const cs = {
        group,
        rank,
        position,
        workUnit,
      };

      const response = await customFetch.patch(
        `/users/${params.id}`,
        { ...rest, cs },
        {
          headers: {
            "X-API-TOKEN": user.token,
          },
        }
      );

      toast.success(response.data.message || "Berhasil!");
      return redirect("/users");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user");
      return null;
    }
  };
const UpdateUser = () => {
  return (
    <>
      <UpdateSingleUser />
    </>
  );
};

export default UpdateUser;
