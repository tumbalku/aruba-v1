import React from "react";
import { customFetch } from "../../utils";
import { toast } from "react-toastify";

import { UpdateSingleUser } from "../../components";
import { redirect } from "react-router-dom";
import { genders, ranks } from "../../data";
import { errorHandleForAction } from "../../utils/exception";

export const loader =
  (store) =>
  async ({ params }) => {
    const user = store.getState().userState.user;
    try {
      const [resUser, resAddresses] = await Promise.all([
        customFetch(`/users/${params.id}`, {
          headers: {
            "X-API-TOKEN": user.token,
          },
        }),
        customFetch(`/addresses`, {
          headers: {
            "X-API-TOKEN": user.token,
          },
        }),
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
      console.log("update data", data);

      const selectedRank = ranks.find((item) => item.name === rank);
      const selectedGender = genders.find(
        (item) => item.name === data.jenisKelamin
      );
      const rolesArray = Object.keys(roles).filter(
        (key) => roles[key] === "on"
      );

      const gender = selectedGender.desc;
      console.log(selectedRank);

      if (selectedRank) {
        data.golongan = selectedRank.golongan;
        data.pangkat = rank;
      }
      const updateUser = {
        roles: rolesArray,
        username,
        name,
        phone,
        address,
        email,
        golongan: data.golongan,
        gender,
        pangkat: data.pangkat ? data.pangkat : null,
        nip,
        position,
        workUnit,
      };
      console.log("new user", updateUser);
      const response = await customFetch.patch(
        `/users/${params.id}`,
        updateUser,
        {
          headers: {
            "X-API-TOKEN": user.token,
          },
        }
      );

      toast.success(response.data.message || "Berhasil!");
      return redirect("/users");
    } catch (error) {
      return errorHandleForAction(error, "toastify");
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
