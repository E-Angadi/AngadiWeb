import React, { useState } from "react";
import ViewCarousel from "@material-ui/icons/ViewCarousel";
import { makeStyles } from "@material-ui/core/styles";
import PageHeader from "../common/PageHeader";
import UploadImageButton from "../../common/UploadImageButton";
import { Paper, Grid } from "@material-ui/core";

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

function Banners() {
  const [images, setImages] = useState([]);

  const callbackSave = (fileObjs) => {
    var imgs = [];
    fileObjs.forEach((img) => {
      imgs.push(img.data);
    });
    setImages(imgs);
  };

  const classes = useStyles();
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
            text={"Add/Update Images"}
            callbackSave={callbackSave}
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
              <Grid item xs={12} sm={4}>
                <Paper>
                  <img
                    src={image ? image : "/imgs/default.jpg"}
                    alt={"banner"}
                    width={"100%"}
                  />
                </Paper>
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
}

export default Banners;
