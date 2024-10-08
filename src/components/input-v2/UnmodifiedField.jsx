import React from "react";

const UnmodifiedField = ({ label, value, border }) => {
  return (
    <div>
      <p className="text-xs capitalize p-2">{label}</p>
      <p
        className={`p-2 w-full ${
          border ? "border  border-b-slate-300" : ""
        } rounded-lg text-slate-500 bg-base-200 text-sm shadow-md truncate`}
      >
        {value ? value : "-"}
      </p>
    </div>
  );
};

export default UnmodifiedField;
