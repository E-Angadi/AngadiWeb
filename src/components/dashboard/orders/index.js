import React from 'react';
import Typography  from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    heading: {
        padding: "20px",
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.5rem'
        }
    },
    spacing: {
        marginTop: '100px',
        marginLeft: '240px',
        backgroundColor: "#E4E4E4",
        minHeight: "calc(100vh - 100px)",
        [theme.breakpoints.down('xs')]: {
            marginTop: '50px',
            marginLeft: '0px',
            minHeight: "calc(100vh - 50px)",
        }
    }
}));

function Orders() {
    const classes = useStyles();
    return (
        <div className={classes.spacing}>
            <Typography variant="h4" className={classes.heading} color='primary' >Orders</Typography>
        </div>
    )
}

export default Orders
