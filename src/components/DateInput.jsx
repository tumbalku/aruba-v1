const DateInput = ({ label, name, defaultValue, value, size, onChange }) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(name, e.target.value); // Memastikan onChange hanya dipanggil jika ada
    }
  };

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
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default DateInput;
