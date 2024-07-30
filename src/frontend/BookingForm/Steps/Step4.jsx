/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import titleBorder from "../../../assets/title-bar-top.svg";
import SelectableButton from "../../../components/SelectableButton";
import CounterTypeTwo from "../../../components/CounterTypeTwo";
import { useDispatch, useSelector } from "react-redux";
import FormButtonNavigator from "../../../components/FormButtonNavidator";
import {
  nextStep,
  previousStep,
  updateFormData,
} from "../../../redux/features/stepSlice";

const Step4 = () => {
  const dispatch = useDispatch();
  const { step, formData } = useSelector((state) => state.steps);
  const { appData } = useSelector((state) => state.theme);

  const initialData = {
    access_type: formData?.delivery_address?.access_type || [],
    is_stair: formData?.delivery_address?.is_stair || false,
    flights: formData?.delivery_address?.flights || 1,
    truck_distance: formData?.delivery_address?.truck_distance || "",
  };

  const [formField, setFormField] = useState(initialData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (formData.delivery_address) {
      setFormField({
        access_type: formData.delivery_address.access_type || [],
        is_stair: formData.delivery_address.is_stair || false,
        flights: formData.delivery_address.flights || 1,
        truck_distance: formData.delivery_address.truck_distance || "",
      });
    }
  }, [formData]);

  const handleAccessButtonClick = (option) => {
    setFormField((prev) => {
      const newAccessType = prev.access_type.includes(option)
        ? prev.access_type.filter((item) => item !== option)
        : [...prev.access_type, option];
      return {
        ...prev,
        access_type: newAccessType,
        is_stair: newAccessType.includes("Stairs"),
        flights: newAccessType.includes("Stairs") ? prev.flights : 1,
      };
    });
  };

  const handleDistanceButtonClick = (option) => {
    setFormField((prev) => ({
      ...prev,
      truck_distance: option,
    }));
  };

  const handlePrevious = () => {
    dispatch(previousStep());
  };

  const handleFormSubmit = () => {
    // Custom validation
    let validationErrors = {};
    if (formField.access_type.length === 0) {
      validationErrors.access_type = "Access type is required";
    }
    if (formField.is_stair && formField.flights < 1) {
      validationErrors.flights = "Flight count is required for stairs";
    }
    if (!formField.truck_distance) {
      validationErrors.truck_distance = "Truck distance is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // If all validations pass, submit the form
    const formDataToSubmit = {
      ...formData,
      delivery_address: {
        ...formData.delivery_address,
        access_type: formField.access_type,
        is_stair: formField.is_stair,
        flights: formField.flights,
        truck_distance: formField.truck_distance,
      },
    };
    dispatch(updateFormData(formDataToSubmit));
    dispatch(nextStep());
  };

  return (
    <div className="form-container">
      <div className="flex flex-grow justify-center px-4 overflow-x-hidden py-2 sm:py-10 bg-white h-full">
        <div className="w-full py-8 sm:py-10 max-w-[660px] opacity-100">
          <div className="flex flex-col gap-2 mb-2">
            <h2
              style={{
                "--bg-image-url": `url(${titleBorder})`,
              }}
              className={`before-border-image text-center relative mt-3 before:content-[''] before:top-[-15px] before:block before:text-center before:relative before:w-[200px] before:h-[5px] before:my-0 before:mx-auto`}
            >
              Delivery Location
            </h2>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col gap-4">
              <div className="my-5">
                <div className="mb-5">
                  <h4 className="text-[21px] font-normal text-center mb-4">
                    What is access like at
                  </h4>
                  {formData && formData?.delivery_address?.address && (
                    <p className="text-center">
                      {formData?.delivery_address?.address}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap justify-center gap-5">
                  {appData &&
                    appData?.accessOptions?.map((option) => (
                      <div key={option} className="flex flex-col gap-1 mb-4">
                        <SelectableButton
                          label={option}
                          isSelected={formField.access_type?.includes(option)}
                          onClick={() => {
                            handleAccessButtonClick(option);
                          }}
                        />
                      </div>
                    ))}
                </div>
                {errors.access_type && (
                  <p className="text-red-500 text-sm text-center">
                    {errors.access_type}
                  </p>
                )}
              </div>

              {formField.access_type.includes("Stairs") && (
                <div className="mb-3">
                  <div className="flex items-center justify-between w-full gap-4 py-4 px-5 rounded-lg bg-white border-[1px] border-solid border-[#A2B9CF]">
                    <span className="leading-4 text-[#394149] font-medium text-[15px]">
                      How many flights of stairs are there?
                    </span>
                    <div className="counter-btn flex items-center justify-center">
                      <div className="flex flex-col gap-1">
                        <CounterTypeTwo
                          isIcon={true}
                          min={1}
                          label="Flight"
                          initialValue={formField.flights}
                          onChange={(value) => {
                            setFormField((prev) => ({
                              ...prev,
                              flights: value,
                            }));
                          }}
                        />
                        {errors.flights && (
                          <span className="text-red-500 text-sm text-center">
                            {errors.flights}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="my-5">
                <div className="mb-7">
                  <h4 className="text-[21px] font-normal mt-0 text-center mb-0 leading-6 sm:leading-8">
                    Truck distance from the front door?
                  </h4>
                  <p className="text-center text-[14px]">
                    Please provide estimate distance. This will help the
                    removalist to estimate the transfer time.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  {appData &&
                    appData?.truckDoorDistanceOptions?.map((option, index) => (
                      <SelectableButton
                        key={index}
                        label={option}
                        isSelected={formField.truck_distance === option}
                        onClick={() => {
                          handleDistanceButtonClick(option);
                        }}
                      />
                    ))}
                  {errors.truck_distance && (
                    <p className="text-red-500 text-sm text-center">
                      {errors.truck_distance}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FormButtonNavigator
        step={step}
        handlePrevious={handlePrevious}
        handleSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default Step4;
