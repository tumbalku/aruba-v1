import React from "react";

const UnmodifiedTextArea = ({ label, value, border }) => {
  return (
    <div>
      <p className="text-xs capitalize p-2">{label}</p>
      <p
        className={`p-2 w-full h-fit ${
          border ? "border  border-b-slate-300" : ""
        } rounded-lg text-slate-500 bg-base-200 text-sm shadow-md`}
      >
        {value ? value : "-"}
      </p>
    </div>
  );
};

export default UnmodifiedTextArea;
