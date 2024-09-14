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
      PPPK,
      isPegawai,
      ASN,
      ...roles
    } = data;
    const selectedRank = ranks.find((item) => item.name === rank);

    const rolesArray = Object.keys(roles).filter((key) => roles[key] === "on");

    const selectedGender = genders.find((item) => item.name === jenisKelamin);
    const gender = selectedGender.desc;

    if (selectedRank) {
      data.golongan = selectedRank.golongan;
      data.pangkat = selectedRank.name;
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
      rank: data.pangkat,
      nip,
      position,
    };
    console.log(newUser);

    return null;
    // try {
    //   const response = await customFetch.post(`/users`, newUser, {
    //     headers: {
    //       "X-API-TOKEN": user.token,
    //     },
    //   });

    //   toast.success(response.data.message || "Berhasil!");
    //   return redirect("/users");
    // } catch (error) {
    //   console.log(error);
    //   toast.error(error.response.data.message);
    //   return null;
    // }
  };
const CreateUser = () => {
  return (
    <>
      <CreateSingleUser />
    </>
  );
};

export default CreateUser;
