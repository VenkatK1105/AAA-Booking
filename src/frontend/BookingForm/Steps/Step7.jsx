/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import titleBorder from "../../../assets/title-bar-top.svg";
import { InputTextarea } from "primereact/inputtextarea";
import FormButtonNavigator from "../../../components/FormButtonNavidator";
import {
  nextStep,
  previousStep,
  updateFormData,
} from "../../../redux/features/stepSlice";

const Step7 = () => {
  const dispatch = useDispatch();
  const { step, formData } = useSelector((state) => state.steps);

  const initialData = {
    additional_comments: formData.additional_comments
      ? formData.additional_comments
      : "",
  };

  const [formField, setFormField] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormField((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePrevious = () => {
    dispatch(previousStep());
  };

  const handleFormSubmit = (e) => {
    dispatch(updateFormData(formField));
    dispatch(nextStep());
  };

  return (
    <div className="form-container">
      <div className="flex flex-grow justify-center px-4 overflow-x-hidden py-2 sm:py-10 bg-white">
        <div className="w-full max-w-[750px] py-8 sm:py-10 opacity-100">
          <div className="flex flex-col gap-2 mb-3">
            <h2
              style={{
                "--bg-image-url": `url(${titleBorder})`,
              }}
              className={`before-border-image text-center relative mt-3 before:content-[''] before:top-[-15px] before:block before:text-center before:relative before:w-[200px] before:h-[5px] before:my-0 before:mx-auto`}
            >
              Additional comments
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <p className="text-center sm:text-lg mb-4">
                Do you have anything to share with the removalist that would
                help with the move?
              </p>
              <div className="flex flex-col gap-4 relative">
                <div className="flex flex-col gap-1 mb-4">
                  <InputTextarea
                    name="additional_comments"
                    value={formField.additional_comments}
                    placeholder="Add details"
                    rows={5}
                    cols={50}
                    onChange={handleChange}
                  />
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

export default Step7;
