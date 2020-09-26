import React, { useState, useEffect } from "react";
import ViewCarousel from "@material-ui/icons/ViewCarousel";
import { makeStyles } from "@material-ui/core/styles";
import PageHeader from "../common/PageHeader";
import UploadImageButton from "../../common/UploadImageButton";
import { Paper, Grid } from "@material-ui/core";
import DeleteImageButton from "../../common/DeleteIconDialog";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {
  createBanner,
  deleteBanner,
  closeSnackbar,
} from "../../../store/actions/bannerActions";

const useStyles = makeStyles((theme) => ({
  heading: {
    padding: "20px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
  divAlign: {
    marginTop: "100px",
    marginLeft: "240px",
    backgroundColor: theme.palette.secondary.main,
    minHeight: "calc(100vh - 100px)",
    padding: "0px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "50px",
      marginLeft: "0px",
      minHeight: "calc(100vh - 50px)",
    },
  },
  galleryDiv: {
    padding: theme.spacing(2),
  },
  defaultDiv: {
    color: theme.palette.secondary.dark,
  },
}));

function Banners(props) {
  const [images, setImages] = useState([]);
  const [sanckbarStatus, setSnackbarStatus] = useState(props.bannerStatus);

  useEffect(() => {
    if (props.banners) {
      setImages(props.banners);
    }
  }, [props.banners]);

  useEffect(() => {
    setSnackbarStatus(props.bannerStatus);
  }, [props.bannerStatus]);

  const handleSave = (filesObj, update) => {
    if (filesObj.length > 0 && update) {
      props.addBanner(filesObj[0].data);
    }
  };

  const handleDelete = (image) => {
    props.removeBanner(image);
  };

  const classes = useStyles();

  const handleSnackbarClose = () => {
    props.closeSnackbar();
  };

  return (
    <div className={classes.divAlign}>
      <PageHeader
        title={"Manage Banners"}
        icon={<ViewCarousel fontSize="large" />}
        subTitle={"Add and update display banners"}
      />
      <Grid container justify="center">
        <Grid item>
          <UploadImageButton
            text={"Add Image"}
            callbackSave={handleSave}
            filesLimit={1}
          />
        </Grid>
      </Grid>
      {images.length === 0 && (
        <div className={classes.defaultDiv}>
          <Grid container justify="center">
            <Grid item>
              <p>Add banner images by clicking the button above</p>
            </Grid>
          </Grid>
        </div>
      )}
      <div className={classes.galleryDiv}>
        <Grid container spacing={2}>
          {images &&
            images.map((image) => (
              <Grid key={image.id} item xs={12} sm={6}>
                <Paper>
                  <img
                    src={image.imageURL ? image.imageURL : "/imgs/default.jpg"}
                    alt={"banner"}
                    width={"100%"}
                  />
                  <Grid item container justify="center">
                    <Grid item>
                      <DeleteImageButton
                        alertText={"Are you sure to delete this image?"}
                        callbackDelete={() => handleDelete(image)}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
        </Grid>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={sanckbarStatus.snackbarStatus}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        key={"topright"}
      >
        <Alert onClose={handleSnackbarClose} severity={sanckbarStatus.variant}>
          {sanckbarStatus.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    banners: state.firestore.ordered.banners,
    bannerStatus: state.banner,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBanner: (ImageData) => dispatch(createBanner(ImageData)),
    removeBanner: (image) => dispatch(deleteBanner(image)),
    closeSnackbar: () => dispatch(closeSnackbar()),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "banners" }])
)(Banners);
