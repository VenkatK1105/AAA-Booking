/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import useCounterSelector from "../hooks/useCounterSelector";
import plus from "../assets/zoom-in.svg";
import { classNames } from "primereact/utils";
import minus from "../assets/zoom-out.svg";
import { Image } from "primereact/image";

const CounterTypeTwo = ({ label, initialValue, onChange, min, isIcon }) => {
  const { count, onClickPlus, onClickMinus } = useCounterSelector(
    initialValue,
    min
  );

  const handlePlus = () => {
    onClickPlus();
    onChange(count + 1);
  };

  const handleMinus = () => {
    if (count > min) {
      onClickMinus();
      onChange(count - 1);
    }
  };

  return (
    <>
      {!isIcon && (
        <div className="flex justify-between items-center py-1">
          <span className="text-[#000] text-[16px] font-medium">{label}</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={count <= 0}
              onClick={handleMinus}
              className={classNames(
                "h-7 w-7 flex items-center justify-center border rounded-full p-1 bg-white text-navy-800 border-solid border-[#A2B9CF] text-[10px] hover:bg-[#F4F7FF] hover:text-[#024FA3] cursor-pointer ",
                {
                  "opacity-[0.3]": count == 0,
                }
              )}
            >
              <i className="pi pi-minus text-[10px]"></i>
            </button>
            <span className="mx-4">{count}</span>
            <button
              type="button"
              onClick={handlePlus}
              disabled={count >= 10}
              className="h-7 w-7 flex items-center justify-center border rounded-full p-1 bg-white text-navy-800 border-solid border-[#A2B9CF] text-[10px] hover:bg-[#F4F7FF] hover:text-[
    #024FA3] cursor-pointer"
            >
              <i className="pi pi-plus text-[10px]"></i>
            </button>
          </div>
        </div>
      )}
      {isIcon && (
        <div className="counter-btn flex items-center justify-center">
          <button type="button" className="border-0 bg-transparent outline-none" onClick={handleMinus} disabled={count <= 0}>
            <Image
              src={minus}
              alt="minus"
              className={`cursor-pointer leading-6 ${count <= 1 ? "opacity-[0.5]" : ""}`}
              width="30"
            />
          </button>
          <span className="mx-4 leading-4 text-[#394149] font-medium text-[15px]">
            {count} {label}
            {count > 1 ? "s" : ""}
          </span>
          <button type="button" className="border-0 bg-transparent outline-none" onClick={handlePlus} disabled={count >= 10}>
            <Image
              src={plus}
              alt="plus"
              className={`cursor-pointer leading-6 ${count >= 10 ? "opacity-[0.5]" : ""}`}
              width="30"
            />
          </button>
        </div>
      )}
    </>
  );
};

export default CounterTypeTwo;
