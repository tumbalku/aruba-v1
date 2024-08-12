const SelectInput = ({
  label,
  labelSize,
  name,
  list,
  defaultValue,
  value,
  size,
  onChange,
}) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className={`label-text capitalize ${labelSize}`}>{label}</span>
      </label>
      <select
        name={name}
        id={name}
        className={`select select-bordered ${size}`}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
      >
        {list.map((item, index) => {
          return (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectInput;
