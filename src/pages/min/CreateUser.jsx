import React from "react";
import { customFetch } from "../../utils";
import { toast } from "react-toastify";

import { CreateSingleUser } from "../../components";
import { redirect } from "react-router-dom";
import { ranks, genders } from "../../data";
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
    const selectedRank = ranks.find((item) => item.name === data.rank);
    const selectedGender = genders.find(
      (item) => item.name === data.jenisKelamin
    );

    if (selectedRank) {
      data.golongan = selectedRank.golongan;
      data.pangkat = selectedRank.name;
    }
    data.gender = selectedGender.desc;

    try {
      const response = await customFetch.post(`/users`, data, {
        headers: {
          "X-API-TOKEN": user.token,
        },
      });

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
