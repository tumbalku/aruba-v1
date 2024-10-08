const InputNumber = ({
  label,
  value,
  size,
  disabled,
  name,
  onChange = () => {},
}) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        readOnly={disabled}
        type="number"
        name={name}
        className={`input input-bordered ${size}`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputNumber;
