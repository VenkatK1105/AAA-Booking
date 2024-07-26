/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import "./styles/timeCard.css"

const TimeCard = ({ type, imgSrc, label, subLabel, onAction, ...rest }) => {
  const { isSelected } = rest;
  return (
    <button
      type={type}
      onClick={onAction}
      className={`time-selext-btn flex flex-1 gap-4 items-center border border-[#A2B9CF] outline-none border-solid bg-white rounded-lg px-6 py-3 ${
        isSelected ? 'ring ring-inset ring-1 ring-[#024FA3]' : ''
      }`}
    >
      <img alt={label} width="36" height="36" src={imgSrc} />
      <div className="flex flex-col text-left w-[100%]">
        <span>{label}</span>
        <span className="text-sm text-neutral-400">{subLabel}</span>
      </div>
    </button>
  );
};

export default TimeCard;
