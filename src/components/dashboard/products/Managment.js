import React, { useState, useEffect } from "react";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Snackbar,
  Typography,
} from "@material-ui/core";
import { Store, Search } from "@material-ui/icons";
import PageHeader from "../common/PageHeader";
import Controls from "../../common/controls/Controls";
import useTable from "../../common/useTable";
import { Link } from "react-router-dom";
import ProductEditDialog from "./ProductEditDialog";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { unitsMap } from "../common/constMaps";
import UploadImageButton from "../../common/UploadImageButton";
import DeleteIconDialog from "../../common/DeleteIconDialog";
import {
  updateProduct,
  updateProductImage,
  deleteProduct,
  closeSnackbar,
} from "../../../store/actions/productActions";
import Alert from "@material-ui/lab/Alert";

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
    backgroundColor: "#E4E4E4",
    minHeight: "calc(100vh - 100px)",
    paddingBottom: "10px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "50px",
      marginLeft: "0px",
      minHeight: "calc(100vh - 50px)",
    },
  },
  pageContent: {
    margin: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(2),
      padding: theme.spacing(1),
    },
  },
  searchInput: {
    width: "85%",
  },
  addProductBtn: {
    marginLeft: theme.spacing(2),
    textAlign: "center",
  },
  visible: {
    color: theme.palette.success.main,
  },
  notVisible: {
    color: theme.palette.warning.main,
  },
}));

const headCells = [
  { id: "title", label: "Title" },
  { id: "category", label: "Category" },
  { id: "netPrice", label: "Display Price" },
  { id: "visibility", label: "Visibility" },
  { id: "unitValue", label: "Quantity", disableSorting: true },
  { id: "imageData", label: "Image", disableSorting: true },
  { id: "edit", label: "Edit", disableSorting: true },
  { id: "delete", label: "Delete", disableSorting: true },
];

function Management(props) {
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [sanckbarStatus, setSnackbarStatus] = useState(props.productStatus);

  useEffect(() => {
    setSnackbarStatus(props.productStatus);
  }, [props.productStatus]);

  const handleSnackbarClose = () => {
    props.closeSnackbar();
  };

  useEffect(() => {
    if (props.products) {
      setRecords(props.products);
    }
  }, [props.products]);

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) =>
            x.title.toLowerCase().includes(target.value.toLowerCase())
          );
      },
    });
  };

  const getCategories = () => {
    const selectCategories = [{ id: 0, title: "None" }];
    if (props.categories) {
      for (var i = 0; i < props.categories.length; i++) {
        selectCategories.push({
          id: props.categories[i].id,
          title: props.categories[i].title,
        });
      }
    }
    return selectCategories;
  };

  const getCategoryTitle = (id) => {
    if (props.categories) {
      var categories = getCategories();
      for (var category of categories) {
        if (category.id === id) return category.title;
      }
    }
  };

  const handleUpdateImage = (filesObj, update, item) => {
    if (filesObj.length > 0 && update) {
      props.updateProductImage(item, filesObj[0].data);
    }
  };

  const handleUpdateProduct = (productInfo, item) => {
    if (productInfo) {
      props.updateProduct(productInfo, item);
    }
  };

  const handleDeleteProduct = (product) => {
    props.deleteProduct(product);
  };

  return (
    <div className={classes.divAlign}>
      <PageHeader
        title={"Product Management"}
        icon={<Store fontSize="large" />}
        subTitle={"Manage your entire store listing"}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search Products"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <Controls.Button
            text={"Add Product"}
            component={Link}
            to={"/dashboard/products/addproduct"}
            className={classes.addProductBtn}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title} </TableCell>
                <TableCell>{getCategoryTitle(item.category)} </TableCell>
                <TableCell>{item.totalPrice} </TableCell>
                <TableCell>
                  <Typography
                    variant="p"
                    className={
                      item.visibility ? classes.visible : classes.notVisible
                    }
                  >
                    <b>{item.special ? "special " : ""}</b>
                    {item.visibility ? "Visible" : "Not Visible"}{" "}
                  </Typography>
                </TableCell>
                <TableCell>{`${item.unitValue} ${item.unit}`} </TableCell>
                <TableCell>
                  <img width={"100px"} alt={item.title} src={item.imageURL} />
                </TableCell>
                <TableCell>
                  <>
                    <ProductEditDialog
                      product={item}
                      categorySelect={getCategories()}
                      callbackSave={handleUpdateProduct}
                      categories={props.categories}
                      categoryId={item.category}
                    />
                    <UploadImageButton
                      rounded={true}
                      filesLimit={1}
                      callbackSave={(filesObj, update) =>
                        handleUpdateImage(filesObj, update, item)
                      }
                    />
                  </>
                </TableCell>
                <TableCell>
                  <DeleteIconDialog
                    alertText={"Are you sure to delete this product?"}
                    callbackDelete={() => handleDeleteProduct(item)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={sanckbarStatus.snackbarStatus}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        key={"topright"}
      >
        <Alert onClose={handleSnackbarClose} severity={sanckbarStatus.variant}>
          {sanckbarStatus.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    products: state.firestore.ordered.products,
    categories: state.firestore.ordered.categories,
    productStatus: state.product,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProduct: (changedProduct, product) =>
      dispatch(updateProduct(changedProduct, product)),
    updateProductImage: (product, ImageData) =>
      dispatch(updateProductImage(product, ImageData)),
    deleteProduct: (product) => dispatch(deleteProduct(product)),
    closeSnackbar: () => dispatch(closeSnackbar()),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "products" }, { collection: "categories" }])
)(Management);
