/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import CustomButton from "./CustomButton";
import { useSelector } from "react-redux";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

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

  const handleFormSubmit = () => {
    handleSubmit();
    scrollToTop();
  };

  return (
    <div className="w-full flex flex-row items-center justify-between sm:justify-center gap-4 sm:gap-8 py-5 px-4">
      {step !== 1 && (
        <CustomButton
          type="button"
          onClick={handlePrevious}
          label="Back"
          className="bg-white border-[#A2B9CF] py-3 px-6 text-sm sm:text-base text-[#5B5B5B] hover:text-white hover:bg-[#5B5B5B]"
        />
      )}
      {step === 1 && (
        <CustomButton
          type="button"
          onClick={handleCancel}
          label="Cancel"
          className="bg-white border-[#A2B9CF] py-3 px-6 text-sm sm:text-base text-[#5B5B5B] hover:text-white hover:bg-[#5B5B5B]"
        />
      )}
      <div className="flex justify-end gap-4 sm:gap-10 items-center">
        {step === 6 && (
          <span className="flex flex-col text-center sm:text-left">
            <span className="font-medium text-sm sm:text-xl md:text-2xl">
              $155.00 <span className="text-xs sm:text-sm">/ hour</span>
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
          onClick={handleFormSubmit}
          label={step === totalSteps ? "Submit" : "Next"}
          className={`bg-[#F58021] border-[#F58021] py-3 px-6 sm:py-3 max-h-12 sm:px-8 text-sm sm:text-base hover:bg-white hover:text-[#F58021] ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default FormButtonNavigator;
