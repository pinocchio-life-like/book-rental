import { useState } from "react";

const useEmailField = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setValue(e.target.value);
    if (error) {
      validate(e.target.value);
    }
  };

  const handleBlur = () => {
    validate(value);
  };

  const validate = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(value);
    setError(isValid ? null : "Invalid email address");
    return isValid;
  };

  return {
    value,
    setValue,
    error,
    handleChange,
    handleBlur,
    validate,
  };
};

export default useEmailField;
