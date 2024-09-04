const FileInput = ({
  label,
  name,
  size,
  labelSize,
  disabled,
  color,
  onChange,
}) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className={`label-text capitalize ${labelSize}`}>
          {label ? label : "Document"}
        </span>
      </label>
      <input
        disabled={disabled}
        type="file"
        name={name}
        className={`file-input ${size} ${color}`}
        onChange={onChange}
      />
    </div>
  );
};

export default FileInput;
