const FormInputWithOnChange = ({
  label,
  name,
  type,
  value,
  size,
  disabled,
  onChange,
}) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        disabled={disabled}
        onChange={onChange}
        value={value}
        // className={`input input-bordered w-full max-w-xs ${size}`}
        className={`input input-bordered ${size}`}
      />
    </div>
  );
};

export default FormInputWithOnChange;
