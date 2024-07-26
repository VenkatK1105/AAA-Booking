/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Logo from "../../components/Logo";
import logoImage from "../../assets/AAA-booking-logo.png";
import CustomButton from "../../components/CustomButton";

// eslint-disable-next-line react/prop-types
const Welcome = ({ action }) => {
  return (
    <div className="flex flex-grow w-full h-full bg-[#e8eff7]">
      <div className="container mx-auto h-full">
        <div className="flex flex-col justify-center h-full">
          <Logo src={logoImage} alt="Logo" width={400} />
          <h1 className="text-[#186aa5] mb-3 text-[62px] font-extrabold">
            Book Your Move
          </h1>
          <p className="text-[#186aa5] text-[30px]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book
          </p>
          <CustomButton
            className="mt-8 text-[30px] py-8 w-fit px-10 h-10 rounded-full bg-[#186aa5] disabled:bg-[#186aa5] text-white disabled:text-slate-400 rounded-full border-1 ring-[#186aa5] border-[#186aa5] hover:bg-[#186aa5]active:bg-[#186aa5] font-bold"
            type="button"
            label="Book Now"
            onClick={action}
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
