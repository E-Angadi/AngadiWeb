import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import { Link } from "react-router-dom";

import { addItem, removeItem } from "../../../store/actions/cartActions";
import { connect } from "react-redux";

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
  quanDiv: {
    display: "flex",
    justifyContent: "end",
  },
  quanPrice: {
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "18px",
  },
}));

function ProductHCard(props) {
  const classes = useStyles();
  const [count, setCount] = useState(1);

  useEffect(() => {
    var cartP = props.cart.find((x) => x.id === props.item.id);
    console.log(cartP);
    if (cartP) {
      setCount(cartP.quantity);
    } else {
      setCount(0);
    }
  }, [props.cart]);

  const handleAdd = () => {
    props.addItem(props.item);
  };

  const plusCount = () => {
    props.addItem(props.item);
  };
  const minusCount = () => {
    props.removeItem(props.item);
  };
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} container>
          <Grid item>
            <Link to={"/product/" + props.item.id} className={classes.title}>
              <img
                className={classes.img}
                src={props.item ? props.item.imageURL : "/imgs/default.jpg"}
                alt={props.item ? props.item.title : "Product Image"}
              />
            </Link>
          </Grid>
          <Grid item xs>
            <div className={classes.details}>
              <Link to={"/product/" + props.item.id} className={classes.title}>
                {props.item.title}
              </Link>
              <div className={classes.priceBox}>
                <span className={classes.aprice}>
                  {"₹ " + props.item.totalPrice}
                </span>
                <span> </span>
                <span className={classes.dprice}>
                  {"₹ " + props.item.taxedPrice}
                </span>
                <span> </span>
                <span className={classes.variant}>
                  {props.item.unitValue + " "}
                  {props.item.unitSelect === 0 ? "kg" : "l"}{" "}
                </span>
                <span className={classes.save}>
                  save ₹ {props.item.taxedPrice - props.item.totalPrice}
                </span>
              </div>
              <div className={classes.quanDiv}>
                <div className={classes.quanPrice}>
                  ₹ {count * props.item.totalPrice}{" "}
                </div>

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

const mapStateToProps = (state) => {
  return {
    cart: state.cart.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (item) => dispatch(addItem(item)),
    removeItem: (item) => dispatch(removeItem(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductHCard);
