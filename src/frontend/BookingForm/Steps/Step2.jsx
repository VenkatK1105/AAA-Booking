/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Dialog } from 'primereact/dialog';
import titleBorder from "../../../assets/title-bar-top.svg?React";
import { FaBed } from "react-icons/fa";
import { PiBathtub } from "react-icons/pi";
import { IoCarOutline } from "react-icons/io5";
import FormButtonNavigator from "../../../components/FormButtonNavidator";
import { useDispatch, useSelector } from "react-redux";
import {
  nextStep,
  previousStep,
  updateFormData,
} from "../../../redux/features/stepSlice";
import AddressDialog from "../../../components/AddressDialog ";
import { Image } from "primereact/image";
import { useLoadScript } from "@react-google-maps/api";
import { useCookies } from "react-cookie";
const googleApiKey = import.meta.env.VITE_GOOGLE_MAP_API_SECRET;

const Step2 = () => {
  const dispatch = useDispatch();
  const { step, formData } = useSelector((state) => state.steps);
  const { appData } = useSelector((state) => state.theme);
  const [cookies, setCookie] = useCookies(["dialogTimestamp"]);
  const THREE_HOURS_MS = 3 * 60 * 60 * 1000; // 3 hours in milliseconds

  const initialFormState = {
    pickup_address: formData?.pickup_address || {},
    delivery_address: formData?.delivery_address || {},
  };

  const [formField, setFormField] = useState(initialFormState);
  const [showPickupDialog, setShowPickupDialog] = useState(false);
  const [showDeliveryDialog, setShowDeliveryDialog] = useState(false);
  const [dontFillingDialog, setDontFillingDialog] = useState(false);

  const [pickupInput, setPickupInput] = useState(
    formData?.pickup_address?.address || ""
  );
  const [deliveryInput, setDeliveryInput] = useState(
    formData?.delivery_address?.address || ""
  );
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [deliverySuggestions, setDeliverySuggestions] = useState([]);
  const [errors, setErrors] = useState({});

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleApiKey,
    libraries: ["places"],
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!pickupInput) {
      newErrors.pickupInput = "Pickup Address is required";
      valid = false;
    }

    if (!deliveryInput) {
      newErrors.deliveryInput = "Delivery Address is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const fetchSuggestions = (input, setSuggestions) => {
    const service = new window.google.maps.places.AutocompleteService();
    if (input.length > 0) {
      service.getPlacePredictions(
        { input, types: ["address"], componentRestrictions: { country: "au" } },
        (predictions) => {
          setSuggestions(predictions || []);
        }
      );
    } else {
      setSuggestions([]);
    }
  };

  const handlePlaceSelect = (suggestion, field) => {
    if (field === "pickup_address") {
      setPickupInput(suggestion.description);
      setShowPickupDialog(true);
    } else {
      setDeliveryInput(suggestion.description);
      setShowDeliveryDialog(true);
    }
    clearSuggestionsAndInput(field);
  };

  const handlePickupSubmit = (data) => {
    setFormField({ ...formField, pickup_address: data });
    const updatedFormData = {
      ...formData,
      pickup_address: data,
    };
    dispatch(updateFormData(updatedFormData));
    setShowPickupDialog(false);
  };

  const handleDeliverySubmit = (data) => {
    setFormField({ ...formField, delivery_address: data });
    const updatedFormData = {
      ...formData,
      delivery_address: data,
    };
    dispatch(updateFormData(updatedFormData));
    setShowDeliveryDialog(false);
  };

  const handlePrevious = () => {
    dispatch(previousStep());
  };

  const handleFormSubmit = () => {
    if (validateForm()) {
      dispatch(updateFormData(formData));
      dispatch(nextStep());
    }
  };

  useEffect(() => {
    const checkDialogStatus = () => {
      const timestamp = cookies.dialogTimestamp;
      if (timestamp) {
        const lastClosed = new Date(timestamp).getTime();
        const now = new Date().getTime();
        if (now - lastClosed < THREE_HOURS_MS) {
          return; // Don't open the dialog if less than 3 hours have passed
        }
      }
      setDontFillingDialog(true);
    };

    checkDialogStatus();
  }, [cookies.dialogTimestamp]);

  const hideDialog = () => {
    setDontFillingDialog(false);
    setCookie("dialogTimestamp", new Date().toISOString(), { path: "/" });
  };

  const renderSuggestions = (suggestions, field) => (
    <ul className="suggestions-list w-full flex-col gap-1 sm:gap-2 mt-1 sm:mt-3 bg-white z-40 shadow-lg p-3 overflow-hidden flex">
      {suggestions.map((suggestion) => (
        <li
          key={suggestion.place_id}
          onClick={() => handlePlaceSelect(suggestion, field)}
          className="w-full bg-white p-3 sm:px-4 hover:font-bold hover:text-[#FFF] hover:bg-[#73bad6] hover:cursor-pointer truncate text-[15px]"
        >
          {suggestion.description}
        </li>
      ))}
    </ul>
  );

  const clearSuggestionsAndInput = (field) => {
    if (field === "pickup_address") {
      setPickupSuggestions([]);
    } else {
      setDeliverySuggestions([]);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex flex-col justify-center gap-10">
        <div className="text-center relative">
          <p className="sm:text-lg mb-20">Loading...</p>
        </div>
      </div>
    );
  }

  const isFormValid =
    Object.keys(errors).length === 0 &&
    formField.pickup_address.address &&
    formField.delivery_address.address;

  return (
    <>
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
                Pick-up and delivery locations
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <p className="text-center sm:text-lg mb-4">Add Location</p>
                <div className="flex flex-col gap-4 relative">
                  {formData &&
                    formData?.pickup_address &&
                    formData?.pickup_address?.address <= 0 && (
                      <div className="relative">
                        <IconField
                          iconPosition="left"
                          className="w-full md:w-14rem"
                        >
                          <InputIcon className="leading-10 ml-2 mt-[-14px]">
                            <svg
                              width="30"
                              height="30"
                              viewBox="0 0 45 45"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="leading-9"
                            >
                              <path
                                d="M39.375 39.375L31.2187 31.2187M20.625 15V26.25M15 20.625H26.25M35.625 20.625C35.625 28.9093 28.9093 35.625 20.625 35.625C12.3407 35.625 5.625 28.9093 5.625 20.625C5.625 12.3407 12.3407 5.625 20.625 5.625C28.9093 5.625 35.625 12.3407 35.625 20.625Z"
                                stroke="#A2B9CF"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </InputIcon>
                          <InputText
                            name="pickup_address"
                            value={pickupInput}
                            onChange={(e) => {
                              setPickupInput(e.target.value);
                              fetchSuggestions(
                                e.target.value,
                                setPickupSuggestions
                              );
                            }}
                            placeholder="Pick-up Address"
                            className="w-full flex gap-4 text-[#A2B9CF] py-7 px-16 rounded-lg bg-white border-[1px] border-[#A2B9CF] hover:cursor-pointer"
                          />
                        </IconField>
                        {pickupSuggestions.length > 0 &&
                          renderSuggestions(
                            pickupSuggestions,
                            "pickup_address"
                          )}
                      </div>
                    )}
                  {formData &&
                    formData.pickup_address &&
                    formData.pickup_address.address &&
                    formData.pickup_address.address.length > 0 && (
                      <div
                        onClick={() => setShowPickupDialog(true)}
                        className="flex flex-col gap-1 px-4 py-2 border border-solid border-[#A2B9CF] rounded-lg hover:cursor-pointer"
                      >
                        <div className="flex justify-between items-center">
                          <label className="text-sm font-bold">
                            Pickup address
                          </label>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="none"
                            className="stroke-black w-4 h-4"
                          >
                            <path d="M12 6.667 9.333 4M1.667 14.333l2.256-.25c.276-.03.413-.046.542-.088a1.33 1.33 0 0 0 .324-.155c.113-.075.21-.173.407-.37L14 4.668A1.886 1.886 0 1 0 11.333 2L2.53 10.804c-.196.196-.294.294-.368.407-.067.1-.119.21-.156.324-.042.129-.057.267-.088.542l-.25 2.256Z"></path>
                          </svg>
                        </div>
                        <span>{formData?.pickup_address?.address}</span>
                        <ul className="flex gap-4 items-center p-0 m-0">
                          <li className="flex items-center gap-1">
                            <FaBed className="text-[16px] text-neutralgrey-700" color="#868C93"/>
                            <span className="text-xs text-neutralgrey-700">
                              {formData?.pickup_address?.bedroom}
                            </span>
                          </li>
                          <li className="flex items-center gap-1">
                            <PiBathtub className="text-[16px] text-neutralgrey-700" color="#868C93" />
                            <span className="text-xs text-neutralgrey-700">
                              {formData?.pickup_address?.bathroom}
                            </span>
                          </li>
                          <li className="flex items-center gap-1">
                          <IoCarOutline className="text-[16px] text-neutralgrey-700" color="#868C93" />
                            <span className="text-xs text-neutralgrey-700">
                              {formData?.pickup_address?.carspaces}
                            </span>
                          </li>
                          <span className="text-xs text-neutralgrey-700">
                            {formData?.pickup_address?.property_type?.name}
                          </span>
                        </ul>
                      </div>
                    )}
                  {errors.pickupInput && (
                    <span className="text-red-500 text-sm text-center">
                      {errors.pickupInput}
                    </span>
                  )}
                  <div className="flex justify-center">
                    <i
                      className="pi pi-ellipsis-v"
                      style={{ fontSize: "1rem" }}
                    ></i>
                  </div>
                  <div className="relative">
                    {formData && formData?.delivery_address?.address <= 0 && (
                      <div className="relative">
                        <IconField
                          iconPosition="left"
                          className="w-full md:w-14rem"
                        >
                          <InputIcon className="leading-10 ml-2 mt-[-14px]">
                            <svg
                              width="30"
                              height="30"
                              viewBox="0 0 45 45"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="leading-9"
                            >
                              <path
                                d="M39.375 39.375L31.2187 31.2187M20.625 15V26.25M15 20.625H26.25M35.625 20.625C35.625 28.9093 28.9093 35.625 20.625 35.625C12.3407 35.625 5.625 28.9093 5.625 20.625C5.625 12.3407 12.3407 5.625 20.625 5.625C28.9093 5.625 35.625 12.3407 35.625 20.625Z"
                                stroke="#A2B9CF"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </InputIcon>
                          <InputText
                            name="delivery_address"
                            value={deliveryInput}
                            placeholder="Delivery Address"
                            onChange={(e) => {
                              setDeliveryInput(e.target.value);
                              fetchSuggestions(
                                e.target.value,
                                setDeliverySuggestions
                              );
                            }}
                            className="w-full flex gap-4 text-[#A2B9CF] py-7 px-16 rounded-lg bg-white border-[1px] border-[#A2B9CF] hover:cursor-pointer"
                          />
                        </IconField>
                        {deliverySuggestions.length > 0 &&
                          renderSuggestions(
                            deliverySuggestions,
                            "delivery_address"
                          )}
                      </div>
                    )}
                  </div>
                  {formData &&
                    formData.delivery_address &&
                    formData.delivery_address.address &&
                    formData.delivery_address.address.length > 0 && (
                      <div
                        onClick={() => setShowDeliveryDialog(true)}
                        className="flex flex-col gap-1 px-4 py-2 border border-solid border-[#A2B9CF] rounded-lg hover:cursor-pointer"
                      >
                        <div className="flex justify-between items-center">
                          <label className="text-sm font-bold">
                            Pickup address
                          </label>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="none"
                            className="stroke-black w-4 h-4"
                          >
                            <path d="M12 6.667 9.333 4M1.667 14.333l2.256-.25c.276-.03.413-.046.542-.088a1.33 1.33 0 0 0 .324-.155c.113-.075.21-.173.407-.37L14 4.668A1.886 1.886 0 1 0 11.333 2L2.53 10.804c-.196.196-.294.294-.368.407-.067.1-.119.21-.156.324-.042.129-.057.267-.088.542l-.25 2.256Z"></path>
                          </svg>
                        </div>
                        <span>{formData?.delivery_address?.address}</span>
                        <ul className="flex gap-4 items-center p-0 m-0">
                          <li className="flex items-center gap-1">
                            <FaBed className="text-[16px] text-neutralgrey-700" color="#868C93"/>
                            <span className="text-xs text-neutralgrey-700">
                              {formData?.delivery_address?.bedroom}
                            </span>
                          </li>
                          <li className="flex items-center gap-1">
                          <PiBathtub className="text-[16px] text-neutralgrey-700" color="#868C93" />
                            <span className="text-xs text-neutralgrey-700">
                              {formData?.delivery_address?.bathroom}
                            </span>
                          </li>
                          <li className="flex items-center gap-1">
                           <IoCarOutline className="text-[16px] text-neutralgrey-700" color="#868C93" />
                            <span className="text-xs text-neutralgrey-700">
                              {formData?.delivery_address?.carspaces}
                            </span>
                          </li>
                          <span className="text-xs text-neutralgrey-700">
                            {formData?.delivery_address?.property_type?.name}
                          </span>
                        </ul>
                      </div>
                    )}
                </div>
                {errors.pickupInput && (
                  <span className="text-red-500 text-sm text-center">
                    {errors.pickupInput}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <FormButtonNavigator
          step={step}
          handlePrevious={handlePrevious}
          handleSubmit={handleFormSubmit}
          disabled={!isFormValid}
        />
      </div>
      {showPickupDialog && (
        <AddressDialog
          header="Pickup address"
          show={showPickupDialog}
          googleApiKey={googleApiKey}
          addressInput={pickupInput}
          appData={appData}
          defaultValues={formField.pickup_address}
          onHide={() => {
            if (!showPickupDialog) return;
            setShowPickupDialog(false);
          }}
          onSubmit={handlePickupSubmit}
        />
      )}
      {showDeliveryDialog && (
        <AddressDialog
          header="Delivery address"
          show={showDeliveryDialog}
          addressInput={deliveryInput}
          appData={appData}
          defaultValues={formField.delivery_address}
          googleApiKey={googleApiKey}
          onHide={() => {
            if (!showDeliveryDialog) return;
            setShowDeliveryDialog(false);
          }}
          onSubmit={handleDeliverySubmit}
        />
      )}

      {dontFillingDialog && (
        <Dialog
          header="Don't like filling forms?"
          visible={dontFillingDialog}
          position="bottom-right"
          style={{ width: "25vw" }}
          onHide={hideDialog}
        >
          <p className="m-0 mb-4">Call our friendly consultant to book your move immediately.</p>
          <a href="tel:(02) 9737 1111" target="_top" className="block text-[#024FA3] text-[17px] leading-7 mb-1"><i className="pi pi-phone mr-1"></i>{" "}<span>(02) 9737 1111</span></a>
          <a href="mailto:info@aaacityremovalist.com.au" className="block text-[#024FA3] text-[17px] leading-7" target="_top"><i className="pi pi-envelope mr-1"></i>{" "}info@aaacityremovalist.com.au</a>
        </Dialog>
      )}
    </>
  );
};

export default Step2;
