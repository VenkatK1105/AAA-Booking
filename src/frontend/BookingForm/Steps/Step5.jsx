/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import titleBorder from "../../../assets/title-bar-top.svg";
import FormButtonNavigator from "../../../components/FormButtonNavidator";
import { useDispatch, useSelector } from "react-redux";
import {
  nextStep,
  previousStep,
  updateFormData,
} from "../../../redux/features/stepSlice";
import Counter from "../../../components/Counter";
import furnishedLight from "../../../assets/furnished-light.png";
import furnishedMedium from "../../../assets/furnished-medium.png";
import furnishedHeavy from "../../../assets/furnished-heavy.png";

const furnitureImages = {
  lightlyFurnished: furnishedLight,
  moderatelyFurnished: furnishedMedium,
  heavilyFurnished: furnishedHeavy,
  
};

const Step5 = () => {
  const dispatch = useDispatch();
  const { formData } = useSelector((state) => state.steps);
  const { appData } = useSelector((state) => state.theme);

  const mergeOversizedFurniture = () => {
    const existingItems = Array.isArray(formData.oversized_furniture)
      ? formData.oversized_furniture
      : [];
    return appData?.initialOversizedItems.map((item) => {
      const existingItem = existingItems.find((i) => i.id === item.id);
      return existingItem ? { ...item, count: existingItem.count } : item;
    });
  };

  const initialData = {
    furnished_type: formData.furnished_type || "",
    is_oversized_furniture: formData.is_oversized_furniture || false,
    oversized_furniture: mergeOversizedFurniture(),
    furniture_disassembly: formData.furniture_disassembly || false,
  };

  const [formField, setFormField] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setFormField(initialData);
  }, [formData]);

  const handlePrevious = () => {
    dispatch(previousStep());
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formField.furnished_type) {
      newErrors.furnished_type = "Please select a furnished type.";
    }
    if (
      formField.is_oversized_furniture &&
      Object.keys(formField.oversized_furniture).length === 0
    ) {
      newErrors.oversized_furniture =
        "Please select at least one oversized item.";
    }
    if (formField.furniture_disassembly === undefined) {
      newErrors.furniture_disassembly =
        "Please specify if furniture needs disassembly.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = () => {
    if (validateForm()) {
      dispatch(updateFormData(formField));
      dispatch(nextStep());
    }
  };

  const handleInputChange = (name, value) => {
    setFormField((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleItemCountChange = (index, count) => {
    const updatedItems = formField.oversized_furniture.map((item, idx) =>
      idx === index ? { ...item, count } : item
    );
    handleInputChange("oversized_furniture", updatedItems);
  };

  const oversizedFurniture = Array.isArray(formField.oversized_furniture)
    ? formField.oversized_furniture
    : [];

  const itemsToShow = showAll
    ? oversizedFurniture
    : oversizedFurniture.slice(0, 4);

  return (
    <div className="form-container">
      <div className="flex flex-grow justify-center px-4 overflow-x-hidden py-2 sm:py-10 bg-white h-full">
        <div className="w-full py-8 sm:py-10 max-w-screen-sm opacity-100">
          <div className="flex flex-col gap-2 mb-3">
            <h2
              style={{
                "--bg-image-url": `url(${titleBorder})`,
              }}
              className={`before-border-image text-center relative mt-3 before:content-[''] before:top-[-15px] before:block before:text-center before:relative before:w-[200px] before:h-[5px] before:my-0 before:mx-auto`}
            >
              What needs moving?
            </h2>
          </div>
          <div className="w-full py-4 sm:py-3 max-w-screen-sm">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col mb-0">
                <label className="leading-7 text-[#394149] font-medium text-[18px] text-center">
                  How furnished is your 1 bedroom house at 125 Swanston St,
                  Melbourne VIC 3000, Australia?
                </label>
              </div>
              <div className="flex overflow-x-auto gap-4">
                {appData && appData?.furnitureOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() =>
                      handleInputChange("furnished_type", option.id)
                    }
                    className={`w-full max-w-[200px] xl:lg:max-w-full flex xl:lg:flex-1 flex-shrink-0 flex-col gap-3 items-left border rounded-lg p-4 border-solid ${
                      formField.furnished_type === option.id
                        ? "border-[#024FA3] bg-[#F4F7FF]"
                        : "border-[#A2B9CF] bg-[#FFF]"
                    }`}
                  >
                    <span>
                      <img alt={option.label} height="36" src={furnitureImages[option.id]} />
                    </span>
                    <span className="text-lg text-left text-[#024FA3] font-bold not-italic">
                      {option.label}
                    </span>
                    <span className="text-left leading-4 text-[#394149] font-medium text-[15px]">
                      {option.description}
                    </span>
                  </button>
                ))}
              </div>
              {errors.furnished_type && (
                <p className="text-red-500 text-sm">{errors.furnished_type}</p>
              )}
              <div className="justify-start text-start">
                <div className="relative">
                  <div className="flex flex-col mb-6">
                    <label className="sm:text-[16px]">
                      Is there any oversized furniture or specialist items?
                    </label>
                    <span className="text-[13px] text-left text-neutralgrey-700">
                      (That requires more than 2 people to lift)
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <button
                      type="button"
                      onClick={() =>
                        handleInputChange("is_oversized_furniture", true)
                      }
                      className={`cursor-pointer w-full px-2 py-4 border text-[14px] border-solid font-semibold ${
                        formField.is_oversized_furniture
                          ? "border-[#024FA3] bg-[#F4F7FF]"
                          : "border-[#A2B9CF] bg-white"
                      } rounded-[10px]`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleInputChange("is_oversized_furniture", false)
                      }
                      className={`cursor-pointer w-full px-2 py-4 border text-[14px] border-solid font-semibold ${
                        formField.is_oversized_furniture === false
                          ? "border-[#024FA3] bg-[#F4F7FF]"
                          : "border-[#A2B9CF] bg-white"
                      } rounded-[10px]`}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
              {errors.is_oversized_furniture && (
                <p className="text-red-500 text-sm">
                  {errors.is_oversized_furniture}
                </p>
              )}
              {formField.is_oversized_furniture && (
                <div className="flex flex-col rounded-md p-6 bg-[#f9f9f9]">
                  <div className="flex flex-col mb-6">
                    <label className="text-sm font-bold">
                      Select heavy or oversized equipment
                    </label>
                    <label className="text-sm">
                      (Additional charges may apply)
                    </label>
                  </div>
                  {itemsToShow.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex flex-row mb-4 justify-between items-center"
                    >
                      <div className="flex flex-col text-sm justify-self-start">
                        <span className="flex font-semibold">
                          {item.label} x {item.count}
                        </span>
                      </div>
                      <div className="flex flex-row justify-self-end">
                        <div className="flex items-center gap-2">
                          <Counter
                            initialValue={item.count}
                            onChange={(count) =>
                              handleItemCountChange(index, count)
                            }
                            min={0}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <a
                    className="text-sm flex justify-center font-bold text-decoration-line: underline mt-3.5"
                    onClick={() => setShowAll(!showAll)}
                  >
                    {showAll ? "Show Less" : "Show All"}
                  </a>
                </div>
              )}
              {errors.oversized_furniture && (
                <p className="text-red-500 text-sm">
                  {errors.oversized_furniture}
                </p>
              )}
              <div className="justify-start text-start">
                <div className="relative">
                  <div className="flex flex-col mb-6">
                    <label className="sm:text-[16px]">
                      Does any of your furniture need disassembly?
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <button
                      type="button"
                      onClick={() =>
                        handleInputChange("furniture_disassembly", true)
                      }
                      className={`cursor-pointer w-full px-2 py-4 border text-[14px] border-solid font-semibold ${
                        formField.furniture_disassembly
                          ? "border-[#024FA3] bg-[#F4F7FF]"
                          : "border-[#A2B9CF] bg-white"
                      } rounded-[10px]`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleInputChange("furniture_disassembly", false)
                      }
                      className={`cursor-pointer w-full px-2 py-4 border text-[14px] border-solid font-semibold ${
                        formField.furniture_disassembly === false
                          ? "border-[#024FA3] bg-[#F4F7FF]"
                          : "border-[#A2B9CF] bg-white"
                      } rounded-[10px]`}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
              {errors.furniture_disassembly && (
                <p className="text-red-500 text-sm">
                  {errors.furniture_disassembly}
                </p>
              )}
              <FormButtonNavigator
                handleSubmit={handleFormSubmit}
                handlePrevious={handlePrevious}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step5;
