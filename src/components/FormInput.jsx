const FormInput = ({
  label,
  labelSize,
  name,
  type,
  defaultValue,
  size,
  disabled,
  onChange,
}) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className={`label-text capitalize ${labelSize}`}>{label}</span>
      </label>
      <input
        type={type}
        name={name}
        disabled={disabled}
        defaultValue={defaultValue}
        onChange={onChange}
        // className={`input input-bordered w-full max-w-xs ${size}`}
        className={`input input-bordered ${size}`}
      />
    </div>
  );
};

export default FormInput;
