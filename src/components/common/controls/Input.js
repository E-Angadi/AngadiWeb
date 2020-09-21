import React from "react";
import { TextField } from "@material-ui/core";

export default function Input(props) {
  const { name, label, value, error = null, onChange } = props;
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      fullWidth
      InputLabelProps={{ shrink: true }}
      {...(error && { error: true, helperText: error })}
    />
  );
}
