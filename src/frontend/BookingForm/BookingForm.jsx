/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppData } from "../../services/bookingServices";
import StepProgressBar from "../../components/StepProgressBar";
import CustomDialogTwo from "../../components/CustomDialogTwo";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import Step4 from "./Steps/Step4";
import Step5 from "./Steps/Step5";
import Step6 from "./Steps/Step6";
import Step7 from "./Steps/Step7";
import Step8 from "./Steps/Step8";
import Thankyou from "./Steps/ThankYou";
import "../style.css";

const BookingForm = () => {
  const dispatch = useDispatch();
  const [visibleBreakDown, setVisibleBreakDown] = useState(false);
  const { step, totalSteps } = useSelector((state) => state.steps);
  const isDataFetched = useSelector((state) => state.theme.isDataFetched);

  const memoizedFetchAppData = useCallback(() => {
    if (!isDataFetched) {
      dispatch(fetchAppData());
    }
  }, [dispatch, isDataFetched]);

  useEffect(() => {
    memoizedFetchAppData();
  }, [memoizedFetchAppData]);

  const handleShowsBreakDown = useCallback(() => {
    setVisibleBreakDown(true);
  }, []);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      case 5:
        return <Step5 />;
      case 6:
        return <Step6 handleShowsBreakDown={handleShowsBreakDown} />;
      case 7:
        return <Step7 />;
      case 8:
        return <Step8 />;
      case 9:
        return <Thankyou />;
      default:
        return <Step1 />;
    }
  };

  return (
    <div className="relative mx-auto bookform-container flex flex-col justify-center px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center z-20 mb-4">
        <StepProgressBar
          currentStep={step}
          totalSteps={totalSteps ? totalSteps : 9}
        />
      </div>
      <FormProvider>
        <div className="form-container flex flex-col bg-white rounded-md pb-8">
          {renderStep()}
          <CustomDialogTwo
            header="Regular Move"
            visible={visibleBreakDown}
            onHide={() => {
              if (!visibleBreakDown) return;
              setVisibleBreakDown(false);
            }}
            style={{ width: "40vw" }}
          >
            <div className="relative rounded-xl text-left transition-all w-full">
              <div className="flex flex-col flex-grow">
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-xs mb-6">Approx. 21 - 23 hours</p>
                    <h4 className="border-0 border-b border-solid border-[#A2B9CF]">
                      <span className="font-medium text-2xs uppercase">
                        Service details
                      </span>
                    </h4>
                    <ul className="flex flex-col gap-1 p-0 list-none">
                      <li className="flex justify-between">
                        <span>2 man team + 4T truck</span>
                        <span>$155.00 per hour</span>
                      </li>
                      <li>Minimum 2 hours, charged in 30 minute increments</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="border-0 border-b border-solid border-[#A2B9CF]">
                      <span className="font-medium text-2xs uppercase">
                        Deposit required
                      </span>
                    </h4>
                    <ul className="flex flex-col gap-1 list-none p-0">
                      <li className="flex justify-between">
                        <span>1st hour</span>
                        <span>$155.00</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Call out fee</span>
                        <span>$77.50</span>
                      </li>
                      <li className="flex justify-between">
                        <span>
                          <b>Total</b>
                        </span>
                        <span>
                          <b>$232.50</b>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="border-0 border-b border-solid border-[#A2B9CF] mb-4 pb-2">
                      <span className="font-medium text-2xs uppercase">
                        Additional fees
                      </span>
                    </h4>
                    <p>
                      Additional fees (e.g. heavy items fees) may be incurred on
                      the day. Your removalist should discuss these with you
                      where relevant.
                    </p>
                  </div>
                  <div>
                    <h4 className="border-0 border-b border-solid border-[#A2B9CF]">
                      <span className="font-medium text-2xs uppercase">
                        On job completion
                      </span>
                    </h4>
                    <p>
                      The total fee will be requested by your provider at the
                      completion of the job. It will be based on the actual
                      number of hours taken, plus any additional fees, plus GST,
                      minus deposit paid.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CustomDialogTwo>
        </div>
      </FormProvider>
    </div>
  );
};

export default BookingForm;
