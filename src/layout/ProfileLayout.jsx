import React from "react";
import { Link, Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-full sm:col-span-4 md:col-span-2 secondary-color p-5 flex sm:flex-col sm:space-y-2 justify-between sm:justify-normal">
        <Link to="/profile" className="btn btn-xs sm:btn-sm">
          General
        </Link>
        <Link to="password" className="btn btn-xs sm:btn-sm">
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
