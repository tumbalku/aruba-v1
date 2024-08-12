import React from "react";
import { customFetch } from "../../utils";
import { toast } from "react-toastify";

import { CreateSingleUser } from "../../components";
import { redirect } from "react-router-dom";
export const loader = async () => {
  try {
    const response = await customFetch.get("/addresses");

    return {
      addresses: response.data.data,
    };
  } catch (error) {
    console.log(error);
    toast.warn("Terjadi error!");
    return null;
    // return redirect("/login");
  }
};
export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const user = store.getState().userState.user;

    const { group, rank, position, workUnit, ...rest } = data;
    const cs = {
      group: group === "-" ? null : group,
      rank: rank === "-" ? null : rank,
      position: position === "-" ? null : position,
      workUnit: workUnit === "-" ? null : workUnit,
      ...rest,
    };

    try {
      const response = await customFetch.post(
        `/users`,
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
      console.log(error);
      return null;
    }
  };
const CreateUser = () => {
  return (
    <>
      <CreateSingleUser />
    </>
  );
};

export default CreateUser;
