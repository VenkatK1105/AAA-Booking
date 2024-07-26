/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const CustomRadioButton = ({ options, name, selectedValue, onChange }) => {
  return (
    <div className="custom-radio-group">
      {options.map((option) => (
        <label key={option.value} className="custom-radio-button">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
          />
          <img src={option.image} alt={option.label} className="radio-image" />
          <span className="radio-label">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default CustomRadioButton;
