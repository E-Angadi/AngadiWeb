import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 8,
    padding: theme.spacing(1),
    border: "1px solid rgba(111,114,132,.25)",
    borderRadius: theme.shape.borderRadius,
    position: "relative",
    transition: "transform .2s",
    "&:hover": {
      transform: "scale(1.01)",
    },
  },
  img: {
    width: 75,
    height: 75,
  },
  details: {
    paddingLeft: theme.spacing(2),
  },
  title: {
    textDecoration: "none",
    wordBreak: "break-word",
    cursor: "pointer",
    fontSize: 16,
    textTransform: "none",
    fontWeight: 700,
    color: "#000000",
  },
  priceBox: {
    marginTop: theme.spacing(1),
    width: "100%",
  },
  aprice: {
    fontWeight: "bold",
    fontSize: "18px",
  },
  dprice: {
    fontSize: "14px",
    textDecoration: "line-through",
  },
  save: {
    color: theme.palette.success.main,
    fontSize: "12px",
    fontWeight: "bold",
    display: "block",
    marginLeft: theme.spacing(1),
  },
  variant: {
    fontSize: "12px",
    fontWeight: "bold",
    padding: "1px 2px 1px 2px",
    background: "rgba(111,114,132,.25)",
    borderRadius: theme.shape.borderRadius,
  },
  changeCountDiv: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  countBtn: {
    color: "#FFFFFF",
    backgroundColor: theme.palette.primary.main,
    height: "32px",
    width: "32px",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  change: {
    height: "32px",
    width: "160px",
    float: "right",
  },
  count: {
    display: "flex",
    height: "100%",
    width: "64px",
    alignItems: "center",
    justifyContent: "center",
  },
  addBtn: {
    backgroundColor: theme.palette.primary.main,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    color: "#FFFFFF",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    fontWeight: 400,
    justifyContent: "space-between",
    borderRadius: theme.shape.borderRadius,
    height: "100%",
  },
  iconAddBtn: {
    background:
      "rgba(255, 255, 255, 0.1) url(/imgs/add_plus.svg) center no-repeat",
    width: 24,
    height: 24,
    borderRadius: "50%",
  },
  detailsDiv: {
    display: "flex",
    justifyContent: "end",
  },
}));

function ProductHCard() {
  const classes = useStyles();
  const [count, setCount] = useState(1);

  const handleAdd = () => {
    plusCount();
  };

  const plusCount = () => {
    setCount(count + 1);
  };
  const minusCount = () => {
    setCount(count - 1);
  };
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} container>
          <Grid item>
            <img
              className={classes.img}
              src="/imgs/default.jpg"
              alt="default"
            />
          </Grid>
          <Grid item xs>
            <div className={classes.details}>
              <a href={window.location.href} className={classes.title}>
                Lux Soft Touch Bar Soap 150 g (Pack of 3)
              </a>
              <div className={classes.priceBox}>
                <span className={classes.aprice}>{"₹" + 260}</span>
                <span> </span>
                <span className={classes.dprice}>{"₹" + 200}</span>
                <span> </span>
                <span className={classes.variant}>{"200gm"}</span>
                <span className={classes.save}>save ₹60</span>
              </div>
              <div className={classes.detailsDiv}>
                <div className={classes.change}>
                  {count < 1 && (
                    <div className={classes.addBtn} onClick={handleAdd}>
                      <span>Add to My Cart</span>
                      <span className={classes.iconAddBtn}></span>
                    </div>
                  )}
                  {count > 0 && (
                    <div className={classes.changeCountDiv}>
                      <IconButton
                        onClick={minusCount}
                        className={classes.countBtn}
                        aria-label="remove"
                      >
                        <Remove />
                      </IconButton>

                      <div className={classes.count}>{count}</div>
                      <IconButton
                        onClick={plusCount}
                        className={classes.countBtn}
                        aria-label="add"
                      >
                        <Add />
                      </IconButton>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProductHCard;
