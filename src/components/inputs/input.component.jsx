import React from "react";

const FormInput = ({
  name,
  title,
  type,
  placeholder,
  value,
  handleChange,
  moreClass = [],
}) => {
  return (
    <div className={"text-start " + moreClass[1]}>
      <label className="form-label" htmlFor={`form-${title}`}>
        <span className={"form-label " + moreClass[0]}>{title}</span>
      </label>
      <br></br>
      <input
        className="form-control"
        onChange={handleChange}
        placeholder={placeholder}
        type={type}
        value={value}
        name={name}
        required
      />
    </div>
  );
};

export default FormInput;
