import React from 'react';
import PageHeader from '../common/PageHeader';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {LibraryAdd} from '@material-ui/icons';
import { Paper } from '@material-ui/core';
import AddCategoryForm from './AddCategoryForm';
import CategoryCard from './CategoryCard';

const useStyles = makeStyles((theme) => ({
    heading: {
        padding: "20px",
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.5rem'
        }
    },
    divAlign: {
        marginTop: '100px',
        marginLeft: '240px',
        backgroundColor: "#E4E4E4",
        minHeight: "calc(100vh - 100px)",
        padding: "0px",
        [theme.breakpoints.down('xs')]: {
            marginTop: '50px',
            marginLeft: '0px',
            minHeight: "calc(100vh - 50px)",
        }
    },
    paperStyles: {
        margin: '20px',
        padding: '20px',
    },
    gridRootStyle: {
        padding: theme.spacing(2),
    }
}));

function AddCategory() {
    const classes = useStyles();
    return (
        <div className={classes.divAlign}>
            <PageHeader title={"Manage Category"} icon={<LibraryAdd fontSize="large" />} subTitle={"Add and edit categories in the listing"} />
            <Grid container justify='center'>
                <Grid item xs={8}>
                    <Paper className={classes.paperStyles}>
                        <AddCategoryForm /> 
                    </Paper>
                </Grid>
            </Grid>
            <div className={classes.gridRootStyle}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <CategoryCard />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <CategoryCard />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <CategoryCard />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <CategoryCard />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <CategoryCard />
                    </Grid>
                </Grid>
            </div>
            
        </div>
    )
}

export default AddCategory
