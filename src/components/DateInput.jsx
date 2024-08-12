import React from "react";

const DateInput = ({ label, name, defaultValue, size }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type="date"
        name={name}
        className={`w-full p-1 rounded-lg ${size}`}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default DateInput;
