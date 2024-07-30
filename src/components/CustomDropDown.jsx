/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import React from "react";
import "./styles/CustomDropDown.css";

const CustomDropDown = ({ label, value, options, id, ...rest }) => {
  return (
    <div className="mt-4 w-full mb-3">
      <FloatLabel>
        <Dropdown
          inputId={id}
          value={value}
          options={options}
          optionLabel="name"
          showClear
          {...rest}
        />
        {label && <label htmlFor={id}>{label}</label>}
      </FloatLabel>
    </div>
  );
};

export default CustomDropDown;
