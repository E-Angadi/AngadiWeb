import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import UploadImageButton from '../../common/UploadImageButton';
import CategoryEditDialog from './CategoryEditDialog';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',   
    },
    media: {
        width: '100%',
        paddingTop: '100%'
    }
}))

function CategoryCard() {
    const classes = useStyles();

    const imageSave = (filesObj) => {
        console.log(filesObj)
    }

    return (
        <Card className={classes.root} >
            <CardHeader
                action={
                    <CategoryEditDialog />
                }
                title='Category Title'
            />
            <CardMedia
                className={classes.media}
                image="/imgs/default.jpg"
                title="Category Title"
            />
            <CardActions>
                <Grid container justify='center'>
                    <Grid item>
                        <UploadImageButton text={'Change Image'} callbackSave={imageSave} />
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    )
}

export default CategoryCard
