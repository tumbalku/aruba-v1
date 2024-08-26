import React from "react";

const UnmodifiedField = ({ label, value }) => {
  return (
    <div>
      <p className="text-xs mb-1">{label}</p>
      <p className="p-2 border rounded-lg border-b-slate-300 text-slate-500  text-sm shadow-lg">
        {value ? value : "-"}
      </p>
    </div>
  );
};

export default UnmodifiedField;
