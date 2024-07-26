/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import CustomButton from "./CustomButton";
import { useSelector } from "react-redux";

const FormButtonNavigator = ({
  step,
  handlePrevious,
  handleCancel,
  handleSubmit,
  breakDown,
  setVisibleBreakDown,
  disabled,
}) => {
  const { totalSteps } = useSelector((state) => state.steps);
  return (
    <div className="w-full flex items-center justify-center gap-8 py-5 px-4">
      {step !== 1 && (
        <CustomButton
          type="button"
          onClick={handlePrevious}
          label="Back"
          className="bg-[#FFF] border-[#A2B9CF] py-4 px-10 text-[#5B5B5B] hover:text-[#FFF] hover:bg-[#5B5B5B]"
        />
      )}
      {step === 1 && (
        <CustomButton
          type="button"
          onClick={handleCancel}
          label="Cancel"
          className="bg-[#FFF] border-[#A2B9CF] py-4 px-10 text-[#5B5B5B] hover:text-[#FFF] hover:bg-[#5B5B5B]"
        />
      )}
      <div className="flex justify-end gap-4 sm:gap-10">
        {step === 6 && (
          <span className="flex flex-col">
            <span className="font-medium text-xl md:2xl">
              $155.00 <span className="text-sm">/ hour</span>
            </span>
            <a
              className="underline text-xs hover:cursor-pointer text-[#024FA3]"
              onClick={() => setVisibleBreakDown((wasOpened) => !wasOpened)}
            >
              Cost breakdown
            </a>
          </span>
        )}
        <CustomButton
          type="button"
          onClick={handleSubmit}
          label={step === totalSteps ? "Submit" : "Next"}
          className={`bg-[#F58021] border-[#F58021] py-4 px-10 hover:bg-white hover:text-[#F58021] ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default FormButtonNavigator;
