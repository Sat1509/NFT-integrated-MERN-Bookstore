import React from 'react';
import './InputField.css';

const InputField = ({ label, name, type = 'text', register, placeholder }) => {
  return (
    <div className="input-field-container">
      <label className="input-label">{label}</label>
      <input
        type={type}
        {...register(name, { required: true })}
        className="input-element"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
