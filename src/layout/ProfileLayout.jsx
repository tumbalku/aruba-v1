import React from "react";
import { Link, Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-full sm:col-span-4 md:col-span-2 secondary-color p-5 flex sm:flex-col gap-2">
        <Link to="/profile" className="btn medium-btn">
          General
        </Link>
        <Link to="password" className="btn medium-btn">
          Ubah Password
        </Link>
      </div>
      <div className="col-span-full sm:col-span-8 md:col-span-10 p-4 pb-10 bg-base-300">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
