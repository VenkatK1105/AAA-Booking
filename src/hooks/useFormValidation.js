import { useState } from "react";

function useFormValidation(initialState, validate) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleBlur = () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  };

  const handleFocus = (event) => {
    const { name } = event.target;
    const validationErrors = validate(values);
    if (validationErrors[name]) {
      setErrors({ ...errors, [name]: validationErrors[name] });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  return { values, errors, handleChange, handleBlur, handleFocus };
}

export default useFormValidation;
