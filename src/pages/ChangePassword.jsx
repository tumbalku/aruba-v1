import React from "react";
import { InputField, SectionInfo } from "../components";
import { toast } from "react-toastify";
import { customFetch } from "../utils";
import { Form, redirect } from "react-router-dom";

export const action =
  (store) =>
  async ({ request }) => {
    const user = store.getState().userState.user;
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      const response = await customFetch.patch("/auth/update/pwd", data, {
        headers: {
          "X-API-TOKEN": user.token,
        },
      });

      toast.success(response.data.message || "Success");

      return redirect("/profile");
    } catch (error) {
      toast.error(error.response.data.message || "Terjadi error");

      return null;
    }
  };
const ChangePassword = () => {
  return (
    <>
      <SectionInfo
        title="Ubah Password"
        info="Silahkan membuat password baru untuk menjaga keamanan akun"
        border
      />
      <Form method="POST" className="space-y-4 my-5">
        <InputField
          label="new password"
          type="text"
          value=""
          name="newPassword"
        />
        <InputField
          label="confirm new password"
          type="password"
          value=""
          name="confirmPassword"
        />
        <button className="btn btn-primary btn-sm">Ubah</button>
      </Form>
    </>
  );
};

export default ChangePassword;
