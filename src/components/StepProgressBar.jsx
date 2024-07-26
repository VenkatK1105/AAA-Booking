/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import "./styles/StepProgressBar.css";

const StepProgressBar = ({ currentStep, totalSteps }) => {
  return (
    <ul className="step-progress-bar w-full flex h-[4px] p-0">
      {[...Array(totalSteps)].map((_, index) => (
        <li
          key={index + 1}
          className={
            index + 1 < currentStep
              ? "completed"
              : index + 1 === currentStep
              ? "active"
              : ""
          }
        ></li>
      ))}
    </ul>
  );
};

export default StepProgressBar;
