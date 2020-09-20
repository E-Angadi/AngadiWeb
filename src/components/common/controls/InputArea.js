import React from 'react'
import { TextField } from '@material-ui/core';

export default function InputArea(props) {

    const { name, label, value,error=null, onChange, rowsMax } = props;
    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            multiline
            rowsMax={rowsMax}
            rows={rowsMax}
            InputLabelProps={{ shrink: true }}
            {...(error && {error:true,helperText:error})}
        />
    )
}