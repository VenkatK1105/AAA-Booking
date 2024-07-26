/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "./styles/custommultiselectcheckbox.css"

const CustomMultiSelectCheckbox = ({ options, selectedValues, onChange }) => {

  const handleCheckboxChange = (value) => {
    if (selectedValues.includes(value)) {
      onChange(
        selectedValues.filter((selectedValue) => selectedValue !== value)
      );
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <div className="custom-checkbox-group">
      {options.map((option) => (
        <label key={option.value} className="custom-checkbox-button">
          <input
            type="checkbox"
            value={option.value}
            checked={selectedValues.includes(option.value)}
            onChange={() => handleCheckboxChange(option.value)}
          />
          { option && option.image &&
          <img
            src={option.image}
            alt={option.label}
            className="image"
            />
          }
          <span className="checkbox-label">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default CustomMultiSelectCheckbox;
