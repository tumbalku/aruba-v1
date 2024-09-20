import React from "react";

const TitleSection = ({ title, desc }) => {
  return (
    <div className=" flex flex-col justify-center items-center">
      <h1 className="text-lg font-bold mb-4">{title}</h1>
      <p className="text-xs">{desc}</p>
    </div>
  );
};

export default TitleSection;
