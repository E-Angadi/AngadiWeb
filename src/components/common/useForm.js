import { useState } from "react";

export default function useForm(
  initialFValues,
  validateOnChange = false,
  validate
) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) validate({ [name]: value });
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;

    setValues({
      ...values,
      [name]: checked,
    });
    if (validateOnChange) validate({ [name]: checked });
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    handleSwitchChange,
    resetForm,
  };
}
