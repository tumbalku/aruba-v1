const SelectInputForIdCuti = ({
  label,
  name,
  list,
  defaultValue,
  size,
  extFun = () => {},
}) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <select
        name={name}
        id={name}
        className={`select select-bordered ${size}`}
        defaultValue={defaultValue}
        onChange={extFun}
      >
        {list.map((item, index) => {
          return (
            <option key={index} value={item.id}>
              {item.name + " (" + item.position + ")"}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectInputForIdCuti;
