import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Divider } from "@material-ui/core";
import { Link } from "react-router-dom";
import { configs } from "../../../config/configs";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.footer.main,
    padding: theme.spacing(2),
    paddingTop: theme.spacing(3),
    boxSizing: "border-box",
  },
  servicesGrid: {
    padding: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  services: {
    fontSize: 18,
    fontWeight: 500,
    color: theme.palette.primary.main,
  },
  servicesList: {
    listStyle: "none",
    padding: 0,
    listStyleType: "none",
  },
  servicesItem: {
    textDecoration: "none",
    color: theme.palette.primary.main,
    fontWeight: 300,
    lineHeight: 1,
  },
  footerSpan: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
    display: "block",
    "&>a": {
      color: theme.palette.primary.dark,
    },
    color: theme.palette.primary.main,
    fontWeight: 300,
    maxWidth: 300,
  },
  downloadImg: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1),
    display: "inline-block",
  },
  copyright: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
    fontSize: 16,
    display: "inline-block",
    textAlign: "center",
  },
}));
function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <Grid container>
        <Grid
          className={classes.servicesGrid}
          item
          xs={6}
          container
          justify="center"
        >
          <Grid item>
            <div className={classes.services}>Customer Services</div>
            <ul className={classes.servicesList}>
              <li>
                <Link className={classes.servicesItem} to="/aboutus">
                  About Us
                </Link>{" "}
              </li>
              <li>
                <Link
                  className={classes.servicesItem}
                  to="/terms-and-conditions"
                >
                  Terms and conditions
                </Link>{" "}
              </li>
              <li>
                <Link className={classes.servicesItem} to="/privacy-policy">
                  Privacy policy
                </Link>
              </li>
            </ul>
            <div className={classes.services}>Download App</div>
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
            </a>

            <a
              href={configs.contactInfo.iosAppLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/imgs/ios_store.png" alt="Download app from appstore" />
            </a>
          </Grid>
        </Grid>
        <Grid
          className={classes.servicesGrid}
          item
          xs={6}
          container
          justify="center"
        >
          <Grid item>
            <div className={classes.services}>Contact Us</div>
            <span className={classes.footerSpan}>
              {" "}
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
            </span>
            <span className={classes.footerSpan}>
              If you encounter any bugs, glitches, lack of functionality,
              delayed deliveries, billing errors or other problems, Kindly email
              us on{" "}
              <a
                href={"mailto:" + configs.contactInfo.email}
                target="_blank"
                rel="noopener noreferrer"
              >
                Email
              </a>
            </span>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      <Grid container justify="center" alignItems="center">
        <Grid item>
          <span className={classes.copyright}>&#169; {configs.title}</span>
        </Grid>
      </Grid>
    </footer>
  );
}

export default Footer;
