/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import titleBorder from "../../../assets/title-bar-top.svg";
import PricingCard from "../../../components/PricingCard";
import { allPlans } from "../../../assets/utils";
import loadingTruck from "../../../assets/oading-truck.png";
import FormButtonNavigator from "../../../components/FormButtonNavidator";
import { useDispatch, useSelector } from "react-redux";
import { OverlayPanel } from "primereact/overlaypanel";
import {
  nextStep,
  previousStep,
  updateFormData,
} from "../../../redux/features/stepSlice";
import { useNavigate } from "react-router-dom";
import { fetchPreviewBooking } from "../../../services/bookingServices";

const Step6 = ({ handleShowsBreakDown }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const op = useRef(null);
  const { step, formData, loading, error } = useSelector(
    (state) => state.steps
  );

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [plans, setAllPlans] = useState(allPlans || []);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [breakDown, setBreakDown] = useState({});

  useEffect(() => {
    dispatch(fetchPreviewBooking(formData));
  }, [dispatch]);

  const handlePrevious = () => {
    dispatch(previousStep());
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleFormSubmit = () => {
    //dispatch(updateFormData(data));
    dispatch(nextStep());
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center gap-10">
        <div className="text-center relative">
          <p className="sm:text-lg mb-20">Generating your moving plan...</p>
          <img
            src={loadingTruck}
            alt="Loading..."
            className="absolute -right-[100%] animate-in-loading"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="flex flex-grow justify-center px-4 overflow-x-hidden py-2 sm:py-10 bg-white h-full">
        <div className="w-full py-8 sm:py-10 max-w-[1140px] opacity-100">
          <div className="flex flex-col gap-2 mb-3">
            <h2
              style={{
                "--bg-image-url": `url(${titleBorder})`,
              }}
              className={`before-border-image text-center relative mt-3 before:content-[''] before:top-[-15px] before:block before:text-center before:relative before:w-[200px] before:h-[5px] before:my-0 before:mx-auto`}
            >
              Based on your inputs
            </h2>
          </div>
          <div className="flex flex-col gap-5">
            {formData && (
              <div className="border-b border-neutralgrey-500 pb-3">
                <div className="pl-2">
                  <ol className="relative list-none p-0">
                    <div className="pb-4">
                      <li className="ml-6 text-center">
                        <h3 className="font-normal text-[20px] text-[#024FA3] -translate-y-1 m-0 mb-3 text-center">
                          {formData?.pickup_address?.address}
                        </h3>
                        <div className="text-[#2A2A2A] text-[14px]">
                          {formData?.pickup_address?.bedroom} bedroom house
                        </div>
                        {formData?.furnished_type == "lightlyFurnished" && (
                          <div className="text-[#2A2A2A] text-[14px]">
                            Lightly furnished (approx. 7m<sup>3</sup>)
                          </div>
                        )}
                        {formData?.furnished_type == "moderatelyFurnished" && (
                          <div className="text-[#2A2A2A] text-[14px]">
                            Moderately furnished (approx. 50m<sup>3</sup>)
                          </div>
                        )}
                        {formData?.furnished_type == "heavilyFurnished" && (
                          <div className="text-[#2A2A2A] text-[14px]">
                            Heavily furnished (approx. 60m<sup>3</sup>)
                          </div>
                        )}
                        {!formData?.is_oversized_furniture && (
                          <div className="text-[#2A2A2A] text-[14px]">
                            No heavy items
                          </div>
                        )}
                        {formData?.is_oversized_furniture && (
                          <div className="text-[#2A2A2A] text-[14px]">
                            Has heavy items
                          </div>
                        )}
                      </li>
                    </div>
                    <li className="ml-6">
                      <h3 className="font-normal text-[20px] text-[#024FA3] -translate-y-1 text-center">
                        {formData?.delivery_address?.address}
                      </h3>
                    </li>
                  </ol>
                </div>
              </div>
            )}
            <div className="border-b border-neutralgrey-500 pb-3">
              <h2 className="mb-6 font-medium text-xl md:2xl text-center text-[#2A2A2A]">
                We estimate your move will require
              </h2>
              <div className="flex flex-row justify-center items-center gap-5">
                <div className="flex items-center mx-2 gap-4">
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 26 25"
                      className="w-6 h-6 stroke-[#667085]"
                    >
                      <path d="M19.087 16.585c1.518.732 2.819 1.905 3.769 3.373.188.29.282.436.315.637.066.41-.226.912-.623 1.074-.195.08-.415.08-.855.08m-4.692-9.468c1.545-.737 2.607-2.266 2.607-4.033 0-1.767-1.062-3.296-2.607-4.032m-2.085 4.032c0 2.486-2.1 4.5-4.692 4.5s-4.692-2.014-4.692-4.5c0-2.485 2.1-4.5 4.692-4.5 2.591 0 4.692 2.015 4.692 4.5ZM2.986 19.687c1.663-2.394 4.286-3.939 7.238-3.939 2.951 0 5.574 1.545 7.237 3.939.364.524.546.786.525 1.121-.016.261-.195.58-.412.738-.279.202-.663.202-1.43.202H4.304c-.768 0-1.152 0-1.43-.202a1.096 1.096 0 0 1-.412-.738c-.021-.335.16-.597.525-1.121Z"></path>
                    </svg>
                  </div>
                  <span className="text-[#024FA3] text-center text-sm sm:text-[15px]">
                    2 man team
                  </span>
                </div>
                <div className="flex items-center mx-2 gap-4">
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 25 24"
                      className="w-6 h-6 stroke-[#667085]"
                    >
                      <path d="M14.5 7h2.337c.245 0 .367 0 .482.028a1 1 0 0 1 .29.12c.1.061.187.148.36.32l4.062 4.063c.173.173.26.26.322.36.054.09.095.188.12.29.027.115.027.237.027.482V15.5c0 .466 0 .699-.076.883a1 1 0 0 1-.541.54C21.699 17 21.466 17 21 17m-5 0h-1.5m0 0V7.2c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C12.98 4 12.42 4 11.3 4H5.7c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C2.5 5.52 2.5 6.08 2.5 7.2V15a2 2 0 0 0 2 2m10 0h-4m0 0a3 3 0 1 1-6 0m6 0a3 3 0 1 0-6 0m16.5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"></path>
                    </svg>
                  </div>
                  <span className="text-[#024FA3] text-center text-sm sm:text-[15px]">
                    4 Tonne truck
                  </span>
                </div>
                <div className="flex items-center mx-2 gap-4">
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                      className="w-6 h-6 stroke-[#667085]"
                    >
                      <path d="M10 5v5l3.333 1.667m5-1.667a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0Z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-row gap-1">
                    <span className="text-[#024FA3] text-center text-sm sm:text-[15px]">
                      Approx 21 - 23 hours{" "}
                      <i
                        onClick={(e) => op.current.toggle(e)}
                        className="pi pi-exclamation-circle relative top-1"
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 pt-5">
              <h2 className="font-medium text-2xl md:text-3xl text-navy-800 m-0">
                Moving Plans
              </h2>
              <p className="text-center">
                We recommend the <b>Regular Move</b> move as it's a reasonably
                straight-forward move.
              </p>

              <div className="grid w-full grid-cols-4 flex-row gap-6">
                {plans.map((plan, index) => (
                  <PricingCard
                    key={index}
                    plan={plan}
                    title={plan.title}
                    originalPrice={plan.originalPrice}
                    discountedPrice={plan.discountedPrice}
                    features={plan.features}
                    buttonText={plan.buttonText}
                    isSelected={selectedPlan === plan.slug}
                    onSelect={() => handlePlanSelect(plan.slug)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FormButtonNavigator
        step={step}
        breakDown={breakDown}
        setVisibleBreakDown={handleShowsBreakDown}
        handlePrevious={handlePrevious}
        handleSubmit={handleFormSubmit}
      />
      <OverlayPanel ref={op} showCloseIcon>
        <div className="flex flex-col max-w-[345px]">
          <div className="text-left text-sm">
            <div className="flex flex-col text-sm">
              <p className="text-sm mb-1">
                The time estimate is indicative only, based on a number of
                factors including property type, number of bedrooms, furnished
                level, access for the truck, travel time, truck size, number of
                men and more. The job may take less time or may take longer.
              </p>
              <p className="text-sm mb-1">
                The total price for the job will be based on the actual number
                of hours taken, as well as additional charges for things like
                road tolls and heavy items.
              </p>
              <p className="text-sm mb-1">
                You can reduce the time taken (and therefore cost) on the day,
                by having items disassembled (where relevant), ready to carry to
                the truck in easy to access locations (eg: garage), etc.
              </p>
            </div>
          </div>
        </div>
      </OverlayPanel>
    </div>
  );
};

export default Step6;
