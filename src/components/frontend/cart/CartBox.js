import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Grid, Divider, IconButton } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import { addItem, removeItem } from "../../../store/actions/cartActions";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(3),
    height: 500,
  },
  head: {
    color: "#000000",
    marginBottom: theme.spacing(1),
  },
  item: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    fontSize: 14,
    border: "1px solid rgba(111,114,132,.25)",
    borderRadius: theme.shape.borderRadius,
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
    height: "22px",
    width: "22px",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  count: {
    display: "flex",
    height: "100%",
    width: "64px",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 20,
    width: 20,
  },
  title: {
    textDecoration: "none",
    color: "#000000",
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

const calcTPrice = (items) => {
  if (!items && items.length === 0) return 0;
  var res = 0;
  items.forEach((item) => {
    res += item.quantity * item.totalPrice;
  });
  return res;
};

function CartBox(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container className={classes.head} xs={12} justify="space-between">
        <Grid item xs="auto">
          My Cart(<b>{props.cart.length}</b>)
        </Grid>
        <Grid item xs="auto">
          <b>{calcTPrice(props.cart)}</b>
        </Grid>
      </Grid>
      <Divider />
      {props.cart.map((product) => (
        <div className={classes.item}>
          <Link className={classes.title} to={"/product/" + product.id}>
            {truncateString(product.title, 50) + " "}
            <span className={classes.variant}>{product.unit}</span>
          </Link>

          <Grid container justify="space-between" alignItems="center">
            <Grid item xs="auto">
              <b>₹ {product.totalPrice}</b>
            </Grid>
            <Grid item xs="auto">
              <div className={classes.changeCountDiv}>
                <IconButton
                  onClick={() => props.removeItem(product)}
                  className={classes.countBtn}
                  aria-label="remove"
                >
                  <Remove className={classes.icon} />
                </IconButton>

                <div className={classes.count}>{product.quantity}</div>

                <IconButton
                  onClick={() => props.addItem(product)}
                  className={classes.countBtn}
                  aria-label="add"
                >
                  <Add className={classes.icon} />
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </div>
      ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(CartBox);
