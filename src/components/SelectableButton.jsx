/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const SelectableButton = ({ label, isSelected, onClick }) => {
  return (
    <button
      type="button"
      className={`cursor-pointer w-[150px] px-2 py-4 border text-[14px] border-solid font-semibold border-[#A2B9CF] rounded-[10px] ${isSelected ? 'bg-[#F4F7FF] text-[#024FA3]' : 'bg-white text-[#535D63]'}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default SelectableButton;