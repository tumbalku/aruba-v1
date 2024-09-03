import React from "react";
import { Link, Outlet, useNavigation } from "react-router-dom";
import { Loading } from "../components";

const FeatureLayout = ({ links }) => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="flex flex-col lg:flex-row lg:gap-4">
      <div className="lg:rounded-lg lg:w-[200px] secondary-color flex flex-row lg:flex-col justify-center lg:justify-start lg:items-start items-center gap-2 p-4 h-fit shadow-xl">
        {links.map((link, index) => {
          return (
            <Link
              key={index}
              to={link.url}
              className="btn btn-xs btn-ghost lg:w-full justify-start text-white"
            >
              <span className="hidden lg:flex">{link.icon}</span> {link.name}
            </Link>
          );
        })}
      </div>
      <div className="flex-1 bg-base-300 h-fit lg:rounded-lg p-4 shadow-xl">
        {isLoading ? <Loading /> : <Outlet />}
      </div>
    </div>
  );
};

export default FeatureLayout;
