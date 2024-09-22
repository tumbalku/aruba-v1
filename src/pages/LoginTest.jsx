import React from "react";
import gambar from "/image/hero1.jpg";
import Login from "./Login";
const LoginTest = () => {
  return (
    <div className="flex ">
      {/* left */}
      <div className="h-screen w-full ">
        <img
          src={gambar}
          alt="gambar landing"
          className="object-cover h-full w-full"
        />
      </div>
      {/* right */}
      <div className="h-screen w-full bg-purple-400">
        <Login />
      </div>
    </div>
  );
};

export default LoginTest;
