import React from "react";
import { InputField, SectionInfo } from "../components";

const ChangePassword = () => {
  return (
    <>
      <SectionInfo
        title="Ubah Password"
        info="Silahkan membuat password baru untuk menjaga keamanan akun"
      />
      <div className="space-y-4 my-5">
        <InputField
          label="new password"
          type="text"
          value="secret123"
          name="newPassword"
        />
        <InputField
          label="confirm new password"
          type="password"
          value="secret123"
          name="confirmNewPassword"
        />
        <button className="btn btn-primary btn-sm">Ubah</button>
      </div>
    </>
  );
};

export default ChangePassword;
