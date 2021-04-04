import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Grid, Divider, IconButton } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import { addItem, removeItem } from "../../../store/actions/cartActions";
import { Link } from "react-router-dom";
import { titleToId } from "../../common/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    padding: theme.spacing(1),
    height: "70vh",
    overflowY: "auto",
  },
  head: {
    color: "#000000",
    backgroundColor: "#FFFFFF",
    marginBottom: theme.spacing(1),
    position: "absolute",
    top: 0,
    padding: theme.spacing(1),
    paddingRight: theme.spacing(2),
    zIndex: 10,
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
    marginTop: 5,
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
  noitems: {
    fontSize: 14,
    color: "rgba(111,114,132,.75)",
    marginTop: theme.spacing(2),
  },
  proceed: {
    position: "absolute",
    bottom: 0,
    backgroundColor: theme.palette.primary.main,
    color: "#FFFFFF",
    overflowX: "hidden",
    textAlign: "center",
    width: "100%",
    height: 30,
    paddingTop: 10,
    fontSize: 16,
    zIndex: 10,
  },
  mainRoot: {
    position: "sticky",
    width: "16.66vw",
    top: 120,
    marginTop: theme.spacing(2),
  },
  spacer: {
    height: 46,
  },
  topSpacer: {
    height: 30,
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
    <div className={classes.mainRoot}>
      <Grid container className={classes.head} justify="space-between">
        <Grid item xs="auto">
          My Cart(<b>{props.cart.length}</b>)
        </Grid>
        <Grid item xs="auto">
          <b>₹ {calcTPrice(props.cart)}</b>
        </Grid>
      </Grid>
      <Divider />
      <div className={classes.root}>
        <div className={classes.topSpacer} />
        {props.cart.map((product) => (
          <div key={product.id} className={classes.item}>
            <Link
              className={classes.title}
              to={"/product/" + titleToId(product.title)}
            >
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
        <div className={classes.spacer} />

        {props.cart.length === 0 && (
          <Grid className={classes.noitems} container justify="center">
            <Grid item xs="auto">
              No items in the cart
            </Grid>
          </Grid>
        )}
      </div>
      {props.cart.length > 0 && (
        <Link to="/checkout/review">
          <div className={classes.proceed}>Proceed to Review</div>
        </Link>
      )}
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
