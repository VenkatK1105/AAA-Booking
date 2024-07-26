/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import CustomButton from "./CustomButton";
import "./styles/pricingCard.css";

const PricingCard = ({
  plan,
  isSelected,
  title,
  originalPrice,
  discountedPrice,
  features,
  buttonText,
  onSelect,
}) => {
  return (
    <div
      className={`border-1 border-solid border-transparent rounded-lg shadow-lg flex flex-col ${
        plan?.slug == "king_kong" ? "preferred-plan scale-[1.05]" : ""
      } items-center ${
        isSelected ? "selected scale-[1.05] border-[#f58021]" : ""
      }`}
    >
      <div className="w-full card-top-wrap p-4">
        <h3 className="text-lg font-bold m-0">{title}</h3>
        <p className="line-through text-gray-500 m-0">WAS: {originalPrice}</p>
        <p
          className={`text-2xl font-bold my-1 text-[#00adef] ${
            plan?.slug == "king_kong" ? "text-[#f58021]" : ""
          }`}
        >
          NOW {discountedPrice}
        </p>
        <p className="text-xs text-gray-500 mb-2">/ half hr ex GST</p>
      </div>
      <CustomButton
        label={isSelected ? "Selected" : buttonText}
        onClick={() => onSelect(plan)}
        className={`bg-[#00adef] border-[#00adef] border-[1px] border-solid text-[15px] py-3 px-8 hover:bg-white hover:text-[#00adef]  p-button p-component ${
          plan?.slug == "king_kong"
            ? "selected bg-[#f58021] border-[#f58021] text-[15px] py-3 px-8 hover:bg-white hover:text-[#f58021]"
            : ""
        }`}
      />
      <div className="border-[#4a4a4a] border-solid border-0 border-b-[1px] w-full my-4"></div>
      <div className="w-full p-4 pt-0">
        <ul className="text-left pl-5 m-0 list-none">
          {features.map((feature, index) => (
            <li key={index} className="mb-1 text-[14px] text-center">
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingCard;
