/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import titleBorder from "../../../assets/title-bar-top.svg";
import CustomButton from "../../../components/CustomButton";
import { nextStep, previousStep } from "../../../redux/features/stepSlice";
import PayPalButton from "../../../components/PayPalButton";
import PaymentAlertDialog from "../../../components/PaymentAlertDialog";
import useFormattedDate from "../../../hooks/useFormattedDate";

const Step8 = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { step, formData } = useSelector((state) => state.steps);
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [paymentSuccessDialogVisible, setPaymentSuccessDialogVisible] =
    useState(false);
  const [paymentFailedDialogVisible, setPaymentFailedDialogVisible] =
    useState(false);

  const handlePrevious = () => {
    dispatch(previousStep());
  };

  const handlePaymentSuccess = (details) => {
    console.log("Payment successful:", details);
    setPaymentSuccessDialogVisible(true);
    dispatch(nextStep());
  };

  const handlePaymentError = (err) => {
    console.error("Payment error:", err);
    setPaymentFailedDialogVisible(true);
  };

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate("/login");
  //   }
  // }, [isLoggedIn, navigate]);

  return (
    <div className="form-container">
      <div className="flex flex-grow justify-center px-6 sm:px-16 overflow-x-hidden py-2 sm:py-10 bg-white">
        <div className="w-full max-w-[1140px] py-8 sm:py-10 opacity-100">
          <div className="flex flex-col gap-2 mb-3">
            <h2
              style={{
                "--bg-image-url": `url(${titleBorder})`,
              }}
              className={`before-border-image text-center relative mt-3 before:content-[''] before:top-[-15px] before:block before:text-center before:relative before:w-[200px] before:h-[5px] before:my-0 before:mx-auto`}
            >
              Your booking summary
            </h2>
          </div>
          <div className="preview-col-wrap flex lg:flex-row justify-between mb-6 gap-10">
            <div className="w-full lg:w-2/3 p-4 rounded-lg">
              <div className="summary-card-item">
                <h3 className="text-xl font-semibold text-left">Moving Date</h3>
                <p>{useFormattedDate(formData?.booking_date)}</p>
                {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
                <p>{formData?.booking_time}</p>
              </div>

              <hr className="border-neutralgrey-500"></hr>

              <div className="summary-card-item">
                <h3 className="text-xl font-semibold text-left">
                  Pick-Up Location
                </h3>
                <p>{formData?.pickup_address?.address}</p>
                <ul>
                  <li>{formData?.pickup_address?.bedroom} x bedrooms</li>
                  <li>{formData?.pickup_address?.bathroom} x bathrooms</li>
                  <li>{formData?.pickup_address?.carspaces} x car spaces</li>
                  <li>{formData?.pickup_address?.property_type?.name}</li>
                </ul>
              </div>

              <hr className="border-neutralgrey-500"></hr>

              <div className="summary-card-item">
                <h3 className="text-xl font-semibold text-left">
                  Access Information
                </h3>
                <ul>
                  {formData &&
                    formData?.pickup_address?.access_type.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                </ul>
              </div>

              <hr className="border-neutralgrey-500"></hr>

              <div className="summary-card-item">
                <h3 className="text-xl font-semibold text-left">
                  Truck Distance From The Front Door?
                </h3>
                <ul>
                  <li>15-50m</li>
                </ul>
              </div>

              <hr className="border-neutralgrey-500"></hr>

              <div className="summary-card-item">
                <h3 className="text-xl font-semibold text-left">
                  Delivery Address
                </h3>
                <p>{formData?.delivery_address?.address}</p>
                <ul>
                  <li>{formData?.delivery_address?.bedroom} x bedrooms</li>
                  <li>{formData?.delivery_address?.bathroom} x bathrooms</li>
                  <li>{formData?.delivery_address?.carspaces} x car spaces</li>
                  <li>{formData?.delivery_address?.property_type?.name}</li>
                </ul>
              </div>

              <hr className="border-neutralgrey-500"></hr>

              <div className="summary-card-item">
                <h3 className="text-xl font-semibold text-left">
                  Access Information
                </h3>
                <ul>
                  {formData &&
                    formData?.delivery_address?.access_type.map(
                      (item, index) => <li key={index}>{item}</li>
                    )}
                </ul>
              </div>

              <hr className="border-neutralgrey-500"></hr>

              <div className="summary-card-item">
                <h3 className="text-xl font-semibold text-left">
                  Truck Distance From The Front Door?
                </h3>
                <ul>
                  <li>15-50m</li>
                </ul>
              </div>

              <div className="mt-12 mb-8 p-policy">
                <h5 className="m-0 text-lg font-semibold">Booking and payment policy</h5>
                <p>
                  By clicking to proceed to payment, you understand that AAA
                  City Removalist is reserving a booking for your service. You
                  will not be charged until a removalist accepts the booking.
                  When your job is accepted, $000.00 will be debited as a
                  deposit.
                </p>
              </div>
            </div>

            <div className="w-full lg:w-1/3 p-4 rounded-lg">
              <div className="w-full bg-[#EDF7FF] p-6 shadow-md rounded-lg">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl m-0 font-semibold mb-4 w-2/3 text-[#024FA3] text-[21px]">
                    Mighty Hercules Package
                  </h3>
                  <div className="flex flex-col justify-between w-1/3">
                    <span className="text-[24px] font-bold text-[##2A2A2A] text-right">
                      $77.50
                    </span>
                    <span className="text-[12px] font-normal text-[##2A2A2A] text-right">
                      *Per hour incl GST
                    </span>
                  </div>
                </div>

                <div className="space-y-2 my-4">
                  <div className="flex justify-between">
                    <span className="text-sm sm:text-base">Minimum Hours Work</span>
                    <span className="text-sm sm:text-base">3 Hours</span>
                  </div>
                  <hr className="border-white"></hr>
                  <div className="flex justify-between">
                    <span className="text-sm sm:text-base">Return Travel</span>
                    <span className="text-sm sm:text-base">1 hour</span>
                  </div>
                  <hr className="border-white"></hr>
                  <div className="flex justify-between">
                    <span className="text-sm sm:text-base">Stair Fee (30 stairs)</span>
                    <span className="text-sm sm:text-base">$90</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm sm:text-base">Fuel Levy</span>
                    <span className="text-sm sm:text-base">5%</span>
                  </div>
                  <hr className="border-white"></hr>
                  <div className="flex justify-between font-semibold">
                    <span className="text-sm sm:text-base">Total</span>
                    <span className="text-sm sm:text-base">$810.60 incl GST</span>
                  </div>
                  <div className="mt-5">
                    <h5 className="text-center text-[16px] font-semibold font-[#2A2A2A] my-5">
                      Payment required to secure booking*
                    </h5>
                    <div className="flex justify-between">
                      <span className="text-sm sm:text-base">Deposit</span>
                      <span className="text-sm sm:text-base">$200</span>
                    </div>
                    <hr className="border-white"></hr>
                    <div className="flex justify-between">
                      <span className="text-sm sm:text-base">GST</span>
                      <span className="text-sm sm:text-base">$20</span>
                    </div>
                    <hr className="border-white"></hr>
                    <div className="flex justify-between font-semibold">
                      <span className="text-sm sm:text-base">Total deposit amount</span>
                      <span className="text-red-600">$220.00</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 items-center justify-center mt-4">
                <PayPalButton
                  layout="horizontal"
                  amount="100.00"
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                  className="min-w-[100%]"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row mt-10 gap-4">
            <div className="flex items-start sm:justify-start gap-8">
              <CustomButton
                type="button"
                onClick={handlePrevious}
                label="Back"
                className="bg-white border border-[#A2B9CF] py-4 px-10 text-[#5B5B5B] hover:text-white hover:bg-[#5B5B5B]"
              />
              <PayPalButton
                layout="horizontal"
                amount="100.00"
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                className="sm:min-w-[300px]"
              />
            </div>
          </div>
          {paymentSuccessDialogVisible && (
            <PaymentAlertDialog
              visible={paymentSuccessDialogVisible}
              onHide={() => setPaymentSuccessDialogVisible(false)}
            >
              <div className="text-center">
                <div className="w-[45px] p-2 rounded-full h-[45px] mx-auto my-0 bg-[#dcfce7]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#16a34a"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-[#000]">
                  Your payment was successful!
                </h3>
                <p>Thank you for your purchase.</p>
              </div>
            </PaymentAlertDialog>
          )}
          {paymentFailedDialogVisible && (
            <PaymentAlertDialog
              visible={paymentFailedDialogVisible}
              onHide={() => setPaymentFailedDialogVisible(false)}
            >
              <div className="text-center">
                <div className="w-[45px] p-2 rounded-full h-[45px] mx-auto my-0 bg-[#fee2e2]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#dc2626"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-[#000]">
                  Your payment was Failed!
                </h3>
                <p>Please Try Again.</p>
              </div>
            </PaymentAlertDialog>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step8;
