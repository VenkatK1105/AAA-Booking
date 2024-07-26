/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {  useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import CounterTypeTwo from "./CounterTypeTwo";
import CustomDropDown from "./CustomDropDown";
import SearchAutoComplete from "./SearchAutoComplete";

const AddressDialog = ({
  header,
  show,
  onHide,
  addressInput,
  defaultValues,
  googleApiKey,
  onSubmit,
  ...rest
}) => {

  const appData = rest.appData;
  
  const initialData = {
    address: addressInput ? addressInput : defaultValues?.address,
    place_id: defaultValues?.place_id || "",
    bedroom: defaultValues?.bedroom || 0,
    bathroom: defaultValues?.bathroom || 0,
    carspaces: defaultValues?.carspaces || 0,
    property_type: defaultValues?.property_type || null,
    moving_situation: defaultValues?.moving_situation || null,
  };

  const [formField, setFormField] = useState(initialData);
  const [errors, setErrors] = useState({});

  const addressRef = useRef(null);

  useEffect(() => {

  }, [])

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formField.address || formField.address.trim() === "") {
      newErrors.address = "Address is required";
      valid = false;
    }

    if (!formField.property_type) {
      newErrors.property_type = "Please select the type of this property";
      valid = false;
    }

    if (!formField.moving_situation) {
      newErrors.moving_situation = "Please choose the situation that applies best to your move";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handlePlaceSelected = (place) => {
    setFormField((prev) => ({
      ...prev,
      address: place.description,
      place_id: place.place_id,
    }));
  };

  const handleCounterChange = (name, value) => {
    setFormField((prev) => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (name, value) => {
    setFormField((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formField);
    }
  };

  const isFormValid = Object.keys(errors).length === 0 && formField.address && formField.property_type && formField.moving_situation;

  return (
    <Dialog
      visible={show}
      style={{ width: "45vw" }}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      className="p-0"
      {...rest}
      closable={false}
    >
      <div className="relative transform text-left transition-all w-full flex flex-col min-h-[calc(80vh)] lg:min-h-[470px]">
        <div className="mb-6">
          <div className="flex justify-end"></div>
          <h2 className="font-medium text-3xl md:text-4xl">{header}</h2>
        </div>
        <div className="flex flex-col flex-grow">
          <div className="py-2 w-full">
            <div className="mb-6 w-full">
              <SearchAutoComplete
                ref={addressRef}
                addressInput={addressInput ? addressInput : defaultValues?.address}
                googleApiKey={googleApiKey}
                onPlaceSelected={handlePlaceSelected}
              />
            </div>
            {errors.address && (
              <span className="text-red-500 text-sm text-center">{errors.address}</span>
            )}
            <div className="flex flex-col gap-2 divide-y mb-6">
              {["bedroom", "bathroom", "carspaces"].map((name) => (
                <CounterTypeTwo
                  key={name}
                  label={name.charAt(0).toUpperCase() + name.slice(1)}
                  initialValue={formField[name]}
                  onChange={(value) => handleCounterChange(name, value)}
                />
              ))}
            </div>
            <div className="grid sm:grid-cols-1 gap-2">
              <div className="flex flex-col gap-1">
                <CustomDropDown
                  value={formField.property_type}
                  label="Property type"
                  id="Property-type"
                  options={appData?.propertyType}
                  onChange={(e) =>
                    handleDropdownChange("property_type", e.value)
                  }
                  className="w-full md:w-14rem"
                />
              </div>
              {errors.property_type && (
                <span className="text-red-500 text-sm">
                  {errors.property_type}
                </span>
              )}
              <div className="flex flex-col gap-1">
                <CustomDropDown
                  value={formField.moving_situation}
                  label="Moving situation"
                  id="Moving-situation"
                  options={appData?.movingSituation}
                  onChange={(e) =>
                    handleDropdownChange("moving_situation", e.value)
                  }
                  className="w-full md:w-14rem"
                />
              </div>
              {errors.moving_situation && (
                <span className="text-red-500 text-sm">
                  {errors.moving_situation}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full mt-6 p-4 justify-end gap-14 bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] z-30">
          <div className="w-full flex justify-between sm:justify-end gap-4">
            <button
              type="button"
              onClick={onHide}
              className="cursor-pointer bg-[#FFF] border-[#A2B9CF] font-semibold text-[#5B5B5B] border-solid py-2 w-fit px-6 h-10 rounded-md hover:text-[#FFF] hover:bg-[#5B5B5B]"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`cursor-pointer bg-[#F58021] border-[#F58021] text-white font-semibold hover:bg-white hover:text-[#F58021] border-solid py-2 w-fit px-6 h-10 rounded-md ${
                !isFormValid ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AddressDialog;
