import React from "react";

const SectionInfo = ({ title, info }) => {
  return (
    <div className="border-b border-b-slate-300 pb-5">
      <h1 className="text-2xl">{title}</h1>
      <p className="text-xs text-slate-500">{info}</p>
    </div>
  );
};

export default SectionInfo;
