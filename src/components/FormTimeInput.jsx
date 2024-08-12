import React from "react";

const FormTimeInput = ({ label, name, defaultValue, size }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type="time"
        name={name}
        className={`w-full p-1 rounded-lg ${size}`}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default FormTimeInput;
