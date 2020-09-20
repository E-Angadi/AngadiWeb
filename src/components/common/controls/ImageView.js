import React from 'react'
import { Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    errorStyles: {
      textAlign: 'center',
      color: theme.palette.error.main,
      display: 'block',
      fontSize: '0.75rem'
    },
    imageStyles: {
        margin: '6px',
    }
}));

export default function ImageView(props) {

    const classes = useStyles(props)
    const {src, error, alt, width, height} = props
    return (
        <>
            <img 
                alt={alt} 
                src={src} 
                width={width} 
                height={height} 
                className={classes.imageStyles}
            />
            <Typography className={classes.errorStyles}>{error} </Typography>
        </>
    )
}