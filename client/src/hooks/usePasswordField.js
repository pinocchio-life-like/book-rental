import { useState } from "react";

const usePasswordField = (initialValue = "") => {
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
    const isValid = value.trim().length >= 6;
    setError(isValid ? null : "Password must be at least 6 characters");
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

export default usePasswordField;
