/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import titleBorder from "../assets/title-bar-top.svg";
import CustomButton from "../components/CustomButton";
import { Checkbox } from "primereact/checkbox";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Image } from "primereact/image";
import { Password } from "primereact/password";
import passwordIcon from "../assets/input-navigation.svg";
import { onSiginUp } from "../services/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { showToast } from "../services/toastService";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, error } = useSelector((state) => state.auth);

  const [formField, setFormField] = useState({
    user_login: "",
    email: "",
    mobile: "",
    password: "",
    accepted_terms: false,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormField((prevFormField) => ({
      ...prevFormField,
      [name]: value,
    }));
  };

  const handleAcceptTerms = (e) => {
    const { name, checked } = e.target;
    setFormField((prevFormField) => ({
      ...prevFormField,
      [name]: checked,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formField.user_login) {
      newErrors.user_login = "Name is required";
    }

    if (!formField.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formField.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formField.password) {
      newErrors.password = "Password is required";
    } else if (formField.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formField.accepted_terms) {
      newErrors.accepted_terms =
        "Please Accept terms and condition is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      dispatch(onSiginUp(formField)).then((response) => {
        if (response && response?.payload &&  response?.payload?.status == true ) {
          showToast("success", "Success", response?.payload?.message);
          navigate("/login");
        } else {
          showToast("danger", "Failed", response?.payload?.message);
        }
      });
    }
  };

  const handleFocus = (field) => {
    if (errors[field] && !validateField(field)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: undefined,
      }));
    }
  };

  const validateField = (field) => {
    if (field === "user_login") {
      if (!formField.user_login) {
        return false;
      }
    } else if (field === "email") {
      if (!formField.email) {
        return false;
      } else if (!/\S+@\S+\.\S+/.test(formField.email)) {
        return false;
      }
    } else if (field === "password") {
      if (!formField.password) {
        return false;
      } else if (formField.password.length < 8) {
        return false;
      }
    } else if (field === "accepted_terms") {
      if (!formField.accepted_terms) {
        return false;
      }
    }
    return true;
  };

  return (
    <div className="app-container relative flex flex-col justify-between items-center bg-[#F4F7FF] h-full py-10 min-h-screen">
      <div className="relative mx-auto bookform-container flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="form-container flex flex-col bg-white rounded-md pb-8">
          <div className="flex flex-grow justify-center px-4 overflow-x-hidden py-2 sm:py-10 h-full">
            <div className="w-full py-8 sm:py-10 max-w-screen-sm opacity-100">
              <div className="flex flex-col gap-2">
                <h2
                  style={{
                    "--bg-image-url": `url(${titleBorder})`,
                  }}
                  className="before-border-image relative text-center font-medium text-3xl md:text-4xl text-navy-800"
                >
                  You're almost there
                </h2>
              </div>
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-0">
                  <p className="text-[#667085] text-md text-center">
                    Please provide your contact details to finalize your
                    booking. You will receive booking updates via SMS and Email.
                  </p>
                  <div className="mt-4 flex flex-1 flex-col space-y-4">
                    <div className="justify-start text-start flex-grow">
                      <div className="relative">
                        <IconField
                          iconPosition="left"
                          className="w-full md:w-14rem"
                        >
                          <InputIcon className="leading-10 ml-3 mt-[-18px]">
                            <i className="pi pi-user text-[#A2B9CF]"></i>
                          </InputIcon>
                          <InputText
                            name="user_login"
                            placeholder="Name"
                            onChange={handleInputChange}
                            onFocus={handleFocus}
                            className="w-full flex gap-4 text-[#A2B9CF] py-5 px-14 rounded-lg bg-white border-[1px] border-[#A2B9CF]"
                          />
                          {errors.user_login && (
                            <small className="p-error">
                              {errors.user_login}
                            </small>
                          )}
                        </IconField>
                      </div>
                    </div>
                    <div className="justify-start text-start flex-grow">
                      <div className="relative">
                        <IconField
                          iconPosition="left"
                          className="w-full md:w-14rem"
                        >
                          <InputIcon className="leading-10 ml-3 mt-[-18px]">
                            <i className="pi pi-envelope text-[#A2B9CF]"></i>
                          </InputIcon>
                          <InputText
                            name="email"
                            placeholder="Email"
                            onChange={handleInputChange}
                            onFocus={handleFocus}
                            className="w-full flex gap-4 text-[#A2B9CF] py-5 px-14 rounded-lg bg-white border-[1px] border-[#A2B9CF]"
                          />
                          {errors.email && (
                            <small className="p-error">{errors.email}</small>
                          )}
                        </IconField>
                      </div>
                    </div>
                    <div className="justify-start text-start flex-grow">
                      <div className="relative">
                        <IconField
                          iconPosition="left"
                          className="w-full md:w-14rem"
                        >
                          <InputIcon className="leading-10 ml-3 mt-[-18px]">
                            <i className="pi pi-phone text-[#A2B9CF]"></i>
                          </InputIcon>
                          <InputText
                            name="mobile"
                            placeholder="Mobile"
                            onChange={handleInputChange}
                            onFocus={handleFocus}
                            className="w-full flex gap-4 text-[#A2B9CF] py-5 px-14 rounded-lg bg-white border-[1px] border-[#A2B9CF]"
                          />
                          {errors.mobile && (
                            <small className="p-error">{errors.mobile}</small>
                          )}
                        </IconField>
                      </div>
                    </div>
                    <div className="justify-start text-start flex-grow">
                      <div className="relative">
                        <IconField
                          iconPosition="left"
                          className={classNames(
                            "w-full md:w-14rem flex gap-4 text-[#A2B9CF] py-1.5 px-14 pr-4 rounded-lg bg-white border-[1px] border-solid border-[#A2B9CF]"
                          )}
                        >
                          <InputIcon className="leading-10 ml-3 mt-[-14px]">
                            <Image src={passwordIcon} width="20" />
                          </InputIcon>
                          <Password
                            name="password"
                            placeholder="Password"
                            onChange={handleInputChange}
                            onFocus={handleFocus}
                            className="custom-password-field w-full border-0"
                            toggleMask
                            feedback={false}
                          />
                        </IconField>
                        {errors.password && (
                          <small className="p-error">{errors.password}</small>
                        )}
                      </div>
                    </div>
                    <div className="w-full my-3 sm:my-4"></div>
                    <div className="flex items-center">
                      <Checkbox
                        variant="filled"
                        name="accepted_terms"
                        inputId="accepted_terms"
                        checked={formField.accepted_terms}
                        onChange={handleAcceptTerms}
                        onFocus={() => handleFocus("accepted_terms")}
                      />
                      <label
                        htmlFor="accepted_terms"
                        className="ml-2 text-[16px] text-left text-[#667085] dark:text-gray-300"
                      >
                        I've read and agree to the{" "}
                        <a
                          className="text-[#024FA3] underline"
                          href="#"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Terms of Use
                        </a>{" "}
                        and{" "}
                        <a
                          className="text-[#024FA3] underline"
                          href="#"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Privacy Policy
                        </a>
                        .
                      </label>
                      {errors.accepted_terms && (
                        <small className="p-error">
                          {errors.accepted_terms}
                        </small>
                      )}
                    </div>
                  </div>
                </div>
                <hr className="w-full my-4 border-0 border-b-[1px] border-[#A2B9CF] border-solid"></hr>
                <div className="mt-1 sm:mt-2">
                  <div className="flex md:flex-row justify-between">
                    <div className="flex gap-5">
                      <CustomButton
                        className="bg-[#FFF] border-[#A2B9CF] py-4 px-10 text-[#5B5B5B] hover:text-[#FFF] hover:bg-[#5B5B5B]"
                        type="button"
                        label="Back"
                        onClick={() => navigate(-1)}
                      />
                      <CustomButton
                        className="bg-[#F58021] border-[#F58021] py-4 px-8 hover:bg-white hover:text-[#F58021]"
                        type="button"
                        label="SignUp"
                        loading={isLoading}
                        onClick={handleFormSubmit}
                      />
                    </div>
                    <div className="flex relative flex-col w-[150px] text-right">
                      <label className="absolute top-[-35px] text-right w-full">
                        Have an account?
                      </label>
                      <CustomButton
                        className="bg-[#024FA3] py-4 px-10 w-fit ml-auto text-[#FFF] border-[1px] border-solid border-[#024FA3] hover:text-[#024FA3] hover:bg-[#FFF]"
                        type="button"
                        label="Login"
                        onClick={() => navigate("/login")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
