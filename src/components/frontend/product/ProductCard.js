import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import { Link } from "react-router-dom";

import { addItem, removeItem } from "../../../store/actions/cartActions";
import { connect } from "react-redux";
import {
  openCheckDialog,
  closeCheckDialog,
} from "../../../store/actions/locationActions";
import { configs } from "../../../config/configs";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#FFFFFF",
    width: 170,
    padding: theme.spacing(1),
    border: "1px solid rgba(111,114,132,.25)",
    borderRadius: theme.shape.borderRadius,
    position: "relative",
    boxSizing: "border-box",
  },
  fullwidthroot: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    padding: theme.spacing(1),
    border: "1px solid rgba(111,114,132,.25)",
    borderRadius: theme.shape.borderRadius,
    position: "relative",
    boxSizing: "border-box",
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
    [theme.breakpoints.down("xs")]: {
      fontSize: "11px",
    },
  },
  iconAddBtn: {
    background:
      "rgba(255, 255, 255, 0.1) url(/imgs/add_plus.svg) center no-repeat",
    width: 24,
    height: 24,
    borderRadius: "50%",
    float: "right",
  },
  imgDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: theme.spacing(1),
  },
  title: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#000000",
    marginBottom: theme.spacing(0),
    display: "inline-block",
    height: 41,
    width: "100%",
    overflow: "hidden",
  },
  priceBox: {
    marginBottom: theme.spacing(1),
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
  nosave: {
    height: "16px",
  },
  variant: {
    fontSize: "12px",
    fontWeight: "bold",
    padding: "1px 2px 1px 2px",
    background: "rgba(111,114,132,.25)",
    borderRadius: theme.shape.borderRadius,
  },
  off: {
    fontSize: "10px",
    fontWeight: "bold",
    padding: "1px 2px 1px 2px",
    background: theme.palette.success.main,
    color: "#FFFFFF",
    position: "absolute",
    top: 0,
    left: 0,
  },
  offNum: {
    fontSize: "12px",
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
  },
  count: {
    display: "flex",
    height: "100%",
    width: "64px",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    height: "90%",
    width: "90%",
  },
}));

const truncateString = (text, limit) => {
  if (!text) {
    return "";
  }
  if (text.length < limit) {
    return text;
  }
  const slicedText = text.slice(0, limit);
  return slicedText + "...";
};

function ProductCard(props) {
  var productData = props.productData;
  var fullwidth = props.fullwidth;
  var titleLimit = props.titleLimit;
  const classes = useStyles();
  const [count, setCount] = useState(0);

  useEffect(() => {
    var cartP = props.cart.find((x) => x.id === productData.id);
    if (cartP) {
      setCount(cartP.quantity);
    } else {
      setCount(0);
    }
  }, [props.cart]);

  const handleAdd = () => {
    if (props.cart.length === 0 && configs.openPincodeEmptyCart) {
      props.openCheckDialog();
    }
    props.addItem(productData);
  };

  const plusCount = () => {
    props.addItem(productData);
  };
  const minusCount = () => {
    props.removeItem(productData);
  };

  if (!titleLimit) {
    titleLimit = 34;
  }

  return (
    <div className={fullwidth ? classes.fullwidthroot : classes.root}>
      <Link to={"/product/" + productData.id}>
        <div className={classes.imgDiv}>
          <img
            className={classes.img}
            src={productData.imageURL}
            alt={productData.title}
          />
          {productData.discount > 0 && (
            <span className={classes.off}>
              <span className={classes.offNum}>
                {productData.discount + "%"}
              </span>{" "}
              off
            </span>
          )}
        </div>
        <span className={classes.title}>
          {truncateString(productData.title, titleLimit)}
        </span>
      </Link>
      <div className={classes.priceBox}>
        <span className={classes.aprice}>{"₹" + productData.totalPrice}</span>
        <span> </span>
        <span className={classes.dprice}>{"₹" + productData.taxedPrice}</span>
        <span> </span>
        <span className={classes.variant}>{productData.unit}</span>
        {productData.discount > 0 && (
          <span className={classes.save}>
            save ₹{productData.taxedPrice - productData.totalPrice}
          </span>
        )}
        {productData.discount === 0 && <div className={classes.nosave}> </div>}
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
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.items,
    openPincodesCheck: state.location.openCheck,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (item) => dispatch(addItem(item)),
    removeItem: (item) => dispatch(removeItem(item)),
    openCheckDialog: () => dispatch(openCheckDialog()),
    closeCheckDialog: () => dispatch(closeCheckDialog()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
