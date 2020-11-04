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
import Form from "../../common/Form";
import Controls from "../../common/controls/Controls";
import useForm from "../../common/useForm";

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
  paperStyles: {
    margin: "20px",
    padding: "20px",
  },
  bannerImg: {
    marginTop: theme.spacing(2),
    width: "98%",
  },
  submitBtnStyles: {
    marginTop: "20px",
    marginBottom: "20px",
  },
}));

const initialFValues = {
  link: "",
  imageData: "",
  mobileImageData: "",
};

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

  const handleDelete = (image) => {
    props.removeBanner(image);
  };

  const classes = useStyles();

  const handleSnackbarClose = () => {
    props.closeSnackbar();
  };

  const validate = (fieldValues = values) => {
    let tmp = { ...errors };
    if ("link" in fieldValues)
      tmp.link = fieldValues.link ? "" : "This field is required.";
    if ("imageData" in fieldValues)
      tmp.imageData = values.imageData === "" ? "Image is required" : "";
    if ("mobileImageData" in fieldValues)
      tmp.mobileImageData =
        values.mobileImageData === "" ? "Mobile image is required" : "";
    setErrors({
      ...tmp,
    });
    if (fieldValues === values)
      return Object.values(tmp).every((x) => x === "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      props.addBanner(values);
      resetForm();
    }
  };

  const imageSave = (fileobjs, update) => {
    if (fileobjs.length > 0 && update) {
      setValues({
        ...values,
        imageData: fileobjs[0].data,
      });
    } else {
      setValues({
        ...values,
        imageData: "",
      });
    }
  };

  const mobileImageSave = (fileobjs, update) => {
    if (fileobjs.length > 0 && update) {
      setValues({
        ...values,
        mobileImageData: fileobjs[0].data,
      });
    } else {
      setValues({
        ...values,
        mobileImageData: "",
      });
    }
  };

  return (
    <div className={classes.divAlign}>
      <PageHeader
        title={"Manage Banners"}
        icon={<ViewCarousel fontSize="large" />}
        subTitle={"Add and update display banners"}
      />

      <Paper className={classes.paperStyles}>
        <Form onSubmit={handleSubmit}>
          <Grid container justify="center">
            <Grid item xs={11}>
              <Controls.Input
                name="link"
                label="Link"
                value={values.link || ""}
                onChange={handleInputChange}
                error={errors.link}
              />
            </Grid>
            <Grid
              xs={12}
              container
              alignItems="center"
              justify="center"
              spacing={1}
            >
              <Grid xs={8}>
                <Controls.ImageView
                  alt="Banner Image"
                  src={
                    values.imageData === ""
                      ? "/imgs/1680x320.png"
                      : values.imageData
                  }
                  width={"98%"}
                  error={errors.imageData}
                />
              </Grid>
              <Grid xs={4}>
                <Controls.ImageView
                  alt="Mobile Banner Image"
                  src={
                    values.mobileImageData === ""
                      ? "/imgs/910x380.png"
                      : values.mobileImageData
                  }
                  width={"98%"}
                  error={errors.mobileImageData}
                />
              </Grid>
            </Grid>
            <Grid item>
              <UploadImageButton
                text={"Add Banner"}
                callbackSave={imageSave}
                filesLimit={1}
              />
            </Grid>
            <Grid item>
              <UploadImageButton
                text={"Add Mobile Banner"}
                callbackSave={mobileImageSave}
                filesLimit={1}
              />
            </Grid>
            <Grid item>
              <Controls.Button
                className={classes.submitBtnStyles}
                type="submit"
                text="Submit"
              />
            </Grid>
          </Grid>
        </Form>
      </Paper>

      <div className={classes.galleryDiv}>
        <Grid container spacing={2}>
          {images &&
            images.map((image) => (
              <Grid key={image.id} item xs={12} sm={6}>
                <Paper>
                  <a href={image.link} target="blank">
                    <img
                      src={
                        image.imageURL ? image.imageURL : "/imgs/1680x320.png"
                      }
                      alt="banner"
                      width={"100%"}
                    />
                    <img
                      src={
                        image.mobileImageURL
                          ? image.mobileImageURL
                          : "/imgs/910x380.png"
                      }
                      alt="banner"
                      width={"100%"}
                    />
                  </a>
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
