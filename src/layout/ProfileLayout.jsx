import React from "react";
import { Link, Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <div className="grid grid-cols-12 ">
      <div className="col-span-full sm:col-span-4 md:col-span-2 secondary-color p-5 flex sm:flex-col gap-2 rounded-tl-lg rounded-bl-lg">
        <Link to="/profile" className="btn btn-sm">
          General
        </Link>
        <Link to="password" className="btn btn-sm">
          Ubah Password
        </Link>
      </div>
      <div className="col-span-full sm:col-span-8 md:col-span-10 p-4 pb-10 bg-base-200 shadow-xl rounded-tr-lg rounded-br-lg">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
