import React from "react";
import UserInfoDetail from "../../components/UserInfoDetail";
import UserInfoCutiDetail from "./components/UserInfoCutiDetail";
import UserInfoSipDetail from "./components/UserInfoSipDetail";

const PublicUserInfo = () => {
  return (
    <div>
      <h1>Public User Info</h1>
      {/* <UserInfoDetail /> */}
      <UserInfoCutiDetail />
      <UserInfoSipDetail />
    </div>
  );
};

export default PublicUserInfo;
