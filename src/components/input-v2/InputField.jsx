const InputField = ({
  label,
  name,
  type,
  value,
  extClass,
  disabled,
  // onChange,
}) => {
  return (
    <div>
      <p className="text-xs mb-1 capitalize ">{label}</p>
      <input
        type={type}
        name={name}
        disabled={disabled}
        // onChange={onChange}
        defaultValue={value}
        className={`p-2 border rounded-lg border-b-slate-300 text-sm shadow-lg w-full ${extClass}`}
      />
    </div>
  );
};

export default InputField;
