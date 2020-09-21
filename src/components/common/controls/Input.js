import React from "react";
import { TextField } from "@material-ui/core";

export default function Input(props) {
  const { name, label, value, error = null, onChange, ...rest } = props;
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      fullWidth
      InputLabelProps={{ shrink: true }}
      {...rest}
      {...(error && { error: true, helperText: error })}
    />
  );
}
