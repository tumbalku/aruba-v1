import React from "react";
import { customFetch } from "../../utils";
import { toast } from "react-toastify";

import { CreateSingleUser } from "../../components";
import { redirect } from "react-router-dom";
import { ranks, genders } from "../../data";
import { errorHandleForAction } from "../../utils/exception";
export const loader = (store) => async () => {
  const user = store.getState().userState.user;
  try {
    const response = await customFetch.get("/addresses", {
      headers: {
        "X-API-TOKEN": user.token,
      },
    });

    return {
      addresses: response.data.data,
    };
  } catch (error) {
    return errorHandleForAction(error);
  }
};
export const action =
  (store) =>
  async ({ request }) => {
    const user = store.getState().userState.user;
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log("create data", data);
    const {
      username,
      name,
      phone,
      address,
      email,
      golongan,
      jenisKelamin,
      rank,
      nip,
      position,
      workUnit,
      ...roles
    } = data;
    const selectedRank = ranks.find((item) => item.name === rank);

    const rolesArray = Object.keys(roles).filter((key) => roles[key] === "on");

    const selectedGender = genders.find((item) => item.name === jenisKelamin);
    const gender = selectedGender.desc;
    console.log(selectedRank);
    if (selectedRank) {
      data.golongan = selectedRank.golongan;
      data.pangkat = rank;
    }
    const newUser = {
      roles: rolesArray,
      username,
      name,
      phone,
      address,
      email,
      golongan: data.golongan,
      gender,
      pangkat: data.pangkat,
      nip,
      position,
      workUnit,
    };
    console.log("new user", newUser);

    try {
      const response = await customFetch.post(`/users`, newUser, {
        headers: {
          "X-API-TOKEN": user.token,
        },
      });

      toast.success(response.data.message || "Berhasil!");
      return redirect("/users");
    } catch (error) {
      return errorHandleForAction(error, "toastify");
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
