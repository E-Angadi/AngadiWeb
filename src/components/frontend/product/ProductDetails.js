import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Hidden } from "@material-ui/core";
import { IconButton, Divider } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import ProductSwiper from "./ProductSwiper";
import {
  EmailShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  WhatsappIcon,
} from "react-share";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { addItem, removeItem } from "../../../store/actions/cartActions";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#eaeded",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  root2: {
    backgroundColor: "#ffffff",
    marginBottom: theme.spacing(1),
  },
  pImage: {
    width: "100%",
    height: "auto",
    marginTop: theme.spacing(1),
  },
  pImageRoot: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  title: {
    fontSize: "20px",
    fontWeight: 700,
    [theme.breakpoints.down("sm")]: {
      fontSize: "18px",
    },
    marginBottom: "4px",
    display: "block",
  },
  details: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  off: {
    fontSize: "14px",
    fontWeight: "bold",
    padding: "4px",
    background: theme.palette.success.main,
    color: "#FFFFFF",
    borderRadius: theme.shape.borderRadius,
    whiteSpace: "nowrap",
    display: "inline-block",
  },
  priceBox: {
    marginTop: theme.spacing(2),
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  apriceDiv: {
    fontSize: "16px",
    fontWeight: 300,
    display: "inline",
    marginRight: theme.spacing(3),
    textDecoration: "line-through",
    marginBottom: theme.spacing(2),
  },
  priceDiv: {
    fontSize: "26px",
    fontWeight: 300,
    display: "inline",
  },
  saveDiv: {
    fontSize: "16px",
    fontWeight: 300,
    color: theme.palette.success.main,
  },
  save: {
    fontWeight: 600,
  },
  aprice: {
    fontWeight: 600,
  },
  price: {
    fontWeight: 600,
  },
  taxinfo: {
    color: "#808080",
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
    height: "40px",
    width: "160px",
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
    float: "right",
  },
  divider: {
    color: theme.palette.primary.main,
    marginTop: theme.spacing(3),
  },
  descHead: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#000000",
  },
  description: {
    padding: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  descSubHead: {
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    fontSize: "16px",
    fontWeight: "bold",
  },
  descContent: {
    paddingLeft: theme.spacing(2),
    fontSize: "16px",
  },
  shareDiv: {
    marginTop: theme.spacing(2),
  },
  shareIcon: {
    paddingRight: theme.spacing(1),
  },
}));

const url = "/imgs/default.jpg";
const title = "Closeup Ever Fresh Red Hot Gel Toothpaste 150 g ( Pack of 2 )";

function ProductDetails(props) {
  const classes = useStyles();
  const [count, setCount] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const product =
    props.products !== undefined ? props.products[0] : { imageURL: url };

  useEffect(() => {
    if (props.products !== undefined && props.products.length > 0) {
      setLoaded(true);
      const product = props.products[0];
    }
  }, [props.products]);

  useEffect(() => {
    if (loaded) {
      var cartP = props.cart.find((x) => x.id === props.match.params.productId);
      if (cartP) {
        setCount(cartP.quantity);
      } else {
        setCount(0);
      }
    }
  }, [props.cart]);

  const handleAdd = () => {
    if (loaded) {
      props.addItem(product);
    }
  };

  const plusCount = () => {
    if (loaded) {
      props.addItem(product);
    }
  };

  const minusCount = () => {
    if (loaded) {
      props.removeItem(product);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.root2}>
        <Grid container spacing={1}>
          <Grid
            item
            xs={12}
            sm={6}
            container
            justify="center"
            alignItems="center"
          >
            <div className={classes.pImageRoot}>
              {loaded && (
                <Hidden smUp>
                  <span className={classes.title}>{product.title + " "}</span>
                  <span className={classes.off}>
                    {product.discount + "% off"}
                  </span>
                </Hidden>
              )}
              <img
                className={classes.pImage}
                src={product.imageURL}
                alt={title}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} container>
            {loaded && (
              <div className={classes.details}>
                <Hidden xsDown>
                  <span className={classes.title}>{product.title} </span>
                  <span className={classes.off}>
                    {product.discount + "% off"}
                  </span>
                </Hidden>
                <div className={classes.priceBox}>
                  <div className={classes.apriceDiv}>
                    <span>M.R.P: </span>
                    <span className={classes.aprice}>
                      {"₹ " + product.taxedPrice}
                    </span>
                  </div>
                  <div className={classes.priceDiv}>
                    <span>Price: </span>
                    <span className={classes.price}>
                      {"₹ " + product.totalPrice}
                    </span>
                  </div>
                  <div className={classes.saveDiv}>
                    <span>You Save: </span>
                    <span className={classes.save}>
                      {"₹ " + (product.taxedPrice - product.totalPrice)}
                    </span>
                  </div>
                  <div className={classes.taxinfo}>Inclusive of all taxes</div>
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
                <div className={classes.shareDiv}>
                  <EmailShareButton url={window.location.href}>
                    <EmailIcon
                      className={classes.shareIcon}
                      size={40}
                      round={true}
                    />
                  </EmailShareButton>
                  <FacebookShareButton url={window.location.href}>
                    <FacebookIcon
                      className={classes.shareIcon}
                      size={40}
                      round={true}
                    />
                  </FacebookShareButton>
                  <WhatsappShareButton url={window.location.href}>
                    <WhatsappIcon
                      className={classes.shareIcon}
                      size={40}
                      round={true}
                    />
                  </WhatsappShareButton>
                </div>
              </div>
            )}
          </Grid>
          <Grid item xs={12} container justify="center">
            <Grid item xs={11}>
              <Divider className={classes.divider} />
            </Grid>
          </Grid>
          {loaded && (
            <Grid item xs={12}>
              <div className={classes.description}>
                <div className={classes.descHead}>Description</div>
                <div className={classes.descSubHead}>{product.title} </div>
                <div className={classes.descContent}>{product.description}</div>
              </div>
            </Grid>
          )}
        </Grid>
      </div>
      <ProductSwiper title={"People also buy"} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.firestore.ordered.products,
    cart: state.cart.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (item) => dispatch(addItem(item)),
    removeItem: (item) => dispatch(removeItem(item)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: "products",
        doc: props.match.params.productId,
      },
    ];
  })
)(ProductDetails);
