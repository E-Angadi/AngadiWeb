import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

export default function SwitchLabel(props) {
  const { name, label, value, onChange, color } = props;

  return (
    <FormControlLabel
      control={
        <Switch checked={value} onChange={onChange} name={name} color={color} />
      }
      label={label}
    />
  );
}
