import { useState } from "react";

const useFormField = (initialValue = "") => {
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
    const isValid = value.trim() !== "";
    setError(isValid ? null : "This field is required");
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

export default useFormField;
