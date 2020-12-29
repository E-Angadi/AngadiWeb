import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { configs } from "../../../config/configs";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#eaeded",
    paddingBottom: theme.spacing(2),
    minHeight: "100vh",
  },
  base: {
    width: "100%",
    marginTop: theme.spacing(1),
    backgroundColor: "#FFFFFF",
    minHeight: "50vh",
    color: "000000",
    padding: theme.spacing(2),
  },
  title: {
    fontSize: 30,
    marginBottom: theme.spacing(1),
    fontWeight: 700,
    textAlign: "center",
  },
  center: {
    textAlign: "center",
  },
  image: {
    width: "100%",
    marginBottom: 40,
  },
}));

function AboutUs() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={11} sm={8}>
          <div className={classes.base}>
            <div className={classes.title}>About Us</div>
            <br />
            <Grid container justify="center">
              <Grid container item xs={6} justify="center">
                <Grid item xs={12}>
                  <img className={classes.image} src="/imgs/logo.png" />
                </Grid>
                <Grid className={classes.center} item xs={12}>
                  {configs.aboutus}
                </Grid>
              </Grid>
            </Grid>
            <br />
            <br />
            <hr />
            <br />
            <Grid container justify="space-between">
              <Grid item xs={12} sm={4}>
                If you encounter any bugs, glitches, lack of functionality,
                delayed deliveries, billing errors or other problems, Kindly
                email us on{" "}
                <a
                  href={"mailto:" + configs.contactInfo.email}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Email
                </a>
                <br />
                <br />
                WhatsApp us :{" "}
                <a
                  href={
                    "https://wa.me/" +
                    configs.contactInfo.watsappNum +
                    "?text=Needed support"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {configs.contactInfo.watsappNum}
                </a>
              </Grid>
              <Grid item sm="auto" xs={12}>
                <div className={classes.services}>Download App</div>
                <br />
                <a
                  href={configs.contactInfo.androidAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.downloadImg}
                >
                  <img
                    src="/imgs/play_store.png"
                    alt="Download app from playstore"
                  />
                </a>{" "}
                <a
                  href={configs.contactInfo.iosAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/imgs/ios_store.png"
                    alt="Download app from appstore"
                  />
                </a>
              </Grid>
            </Grid>
            <br />
            {configs.usingAlgoliaFree && (
              <div>
                Search powered <br /> by <b>Algolia</b>
              </div>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default AboutUs;
