/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import CustomCalender from "../../../components/CustomCalender";
import TimeCard from "../../../components/TimeCard";
import titleBorder from "../../../assets/title-bar-top.svg";
import { allTimeType } from "../../../assets/utils";
import FormButtonNavigator from "../../../components/FormButtonNavidator";
import { nextStep, resetStep, updateFormData } from "../../../redux/features/stepSlice";
import { useState } from "react";
import useFormValidation from "../../../hooks/useFormValidation";

const validateFieldData = (values) => {
  let errors = {};
  if (!values.booking_date) {
    errors.booking_date = "Date is required";
  }

  if (!values.booking_time) {
    errors.booking_time = "Time is required";
  }

  return errors;
};

const Step1 = () => {
  const dispatch = useDispatch();
  const { step, formData } = useSelector((state) => state.steps);
  const initialData = {
    booking_date:
      formData.booking_date instanceof Date
        ? formData.booking_date.toISOString()
        : formData.booking_date,
    booking_time: formData.booking_time,
  };

  
  const [formField, setFormField] = useState(initialData);
  const { values, errors, handleChange, handleBlur, handleFocus } = useFormValidation(formField, validateFieldData);

  const handleDateChange = (value) => {
    const date = new Date(value);
    setFormField((fieldData) => ({
      ...fieldData,
      booking_date: date,
    }));
    handleChange({ target: { name: 'booking_date', value: date } });
  };

  const handleTimeChange = (label) => {
    setFormField((fieldData) => ({
      ...fieldData,
      booking_time: label,
    }));
    handleChange({ target: { name: 'booking_time', value: label } });
  };

  const handleFormSubmit = () => {
    const validationErrors = validateFieldData(formField);
    if (Object.keys(validationErrors).length === 0) {
      dispatch(updateFormData(formField));
      dispatch(nextStep());
    } else {
      handleBlur();
    }
  };

  const handleCancel = () => {
    dispatch(resetStep());
  };

  const isFormValid = Object.keys(errors).length === 0 && formField.booking_date && formField.booking_time;

  return (
    <div className="form-container">
      <div className="step1 w-full flex flex-grow justify-center px-4 overflow-x-hidden py-4 sm:py-14 sm:pb-6">
        <div className="w-full py-8 sm:py-5 sm:max-w-[720px] opacity-100">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h2
                style={{
                  "--bg-image-url": `url(${titleBorder})`,
                }}
                className={`before-border-image text-center relative mt-3 before:content-[''] before:top-[-15px] before:block before:text-center before:relative before:w-[200px] before:h-[5px] before:my-0 before:mx-auto`}
              >
                When are you moving?
              </h2>

              <div className="flex flex-col gap-1 mb-4">
                <label className="text-center sm:text-lg mb-4">
                  Book A Date
                </label>
                <CustomCalender
                  numberOfMonths={2}
                  value={new Date(formField.booking_date)}
                  onChange={(date) => handleDateChange(date)}
                  onFocus={handleFocus}
                  className="rmdp-prime rmdp-shadow custom-c-calendar md:block"
                />
                {errors.booking_date && (
                  <span className="text-red-500 text-sm text-center">
                    {errors.booking_date}
                  </span>
                )}
              </div>
            </div>
            <div>
              <div className="flex flex-col mb-6">
                <label className="sm:text-lg text-center">Book A Time</label>
                <span className="text-center text-sm text-neutral-400">
                  An exact time will be organized during booking confirmation
                  process
                </span>
              </div>
              <div className="flex gap-6">
                {allTimeType &&
                  allTimeType.map((option, i) => (
                    <TimeCard
                      key={i}
                      imgSrc={option.imgSrc}
                      type="button"
                      label={option.label}
                      subLabel={option.subLabel}
                      onAction={() => handleTimeChange(option.label)}
                      isSelected={formField.booking_time === option.label}
                    />
                  ))}
              </div>
              <div>
                {errors.booking_time && (
                  <span className="text-red-500 text-sm text-center">
                    {errors.booking_time}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="mt-10">
            <FormButtonNavigator
              step={step}
              handleCancel={handleCancel}
              handleSubmit={handleFormSubmit}
              disabled={!isFormValid}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;