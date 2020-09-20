import React from 'react'
import {Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    textStyles: {
        textAlign: 'center'
    }
}));

function Text(props) {
    const { value } = props;
    const classes = useStyles(); 

    return (
        <Typography
            color='primary'
            className={classes.textStyles}
        >
            {value}
        </Typography>
    )
}

export default Text
