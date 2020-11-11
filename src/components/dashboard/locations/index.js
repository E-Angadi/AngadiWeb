import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PageHeader from "../common/PageHeader";
import { LocationOn, Clear } from "@material-ui/icons";
import { Paper, Grid, TextField, Button, IconButton } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { writeLocations } from "../../../store/actions/locationActions";

const useStyles = makeStyles((theme) => ({
  heading: {
    padding: "20px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
  spacing: {
    marginTop: "100px",
    marginLeft: "240px",
    backgroundColor: "#E4E4E4",
    minHeight: "calc(100vh - 100px)",
    [theme.breakpoints.down("xs")]: {
      marginTop: "50px",
      marginLeft: "0px",
      minHeight: "calc(100vh - 50px)",
    },
  },
  rootPaper: {
    margin: 20,
    padding: 20,
  },
  addBtn: {
    textTransform: "none",
  },
  tagboxSpan: {
    padding: theme.spacing(1),
    border: "1px solid #215273",
    borderRadius: theme.shape.borderRadius,
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
    display: "inline-block",
  },
  crossBtn: {
    marginLeft: 4,
  },
}));

function Locations(props) {
  const classes = useStyles();
  const [code, setCode] = useState();
  const [pincodes, setPincodes] = useState([]);

  const handleChange = (event) => {
    if (event.target.value.length < 7 && event.target.value > -1) {
      setCode(event.target.value);
    }
  };

  useEffect(() => {
    if (props.locations && props.locations.length > 0) {
      var tmp = props.locations[0].locations.split(",");
      if (tmp && tmp.length > 0) {
        setPincodes(tmp);
      }
    }
  }, [props.locations]);

  const addPincode = () => {
    if (code.length === 6) {
      var tmp = pincodes;
      tmp.push(code);
      props.writeLocations(tmp);
      setPincodes(tmp);
      setCode(0);
    }
  };

  const removePincode = (idx) => {
    var tmp = pincodes;
    tmp.splice(idx, 1);
    props.writeLocations(tmp);
  };

  return (
    <div className={classes.spacing}>
      <PageHeader
        title={"Manage Delivery Locations"}
        icon={<LocationOn fontSize="large" />}
        subTitle={"Add and remove delivery locations pincode"}
      />
      <Grid container justify="center">
        <Grid item xs={7}>
          <Paper className={classes.rootPaper}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <TextField
                  value={code}
                  label="Pincode"
                  type="pincode"
                  onChange={handleChange}
                  variant="filled"
                  size="small"
                />
              </Grid>
              <Grid item>
                <Button
                  size="medium"
                  className={classes.addBtn}
                  onClick={addPincode}
                  variant="contained"
                  color="primary"
                >
                  Add Pincode
                </Button>
              </Grid>
            </Grid>
            <div>
              {pincodes.length > 0 &&
                pincodes.map((pincode, idx) => (
                  <span key={idx} className={classes.tagboxSpan}>
                    {pincode}
                    <IconButton
                      onClick={() => removePincode(idx)}
                      className={classes.crossBtn}
                      size="small"
                    >
                      <Clear color="primary" />
                    </IconButton>
                  </span>
                ))}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state.firestore.ordered);
  return {
    locations: state.firestore.ordered.locations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    writeLocations: (data) => dispatch(writeLocations(data)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "locations" }])
)(Locations);
