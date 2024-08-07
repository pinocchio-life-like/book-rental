import { useState } from "react";

const useConfirmPasswordField = (passwordValue) => {
  const [value, setValue] = useState("");
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
    const isValid = value === passwordValue;
    setError(isValid ? null : "Passwords do not match");
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

export default useConfirmPasswordField;
