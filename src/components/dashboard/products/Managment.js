import React, { useState, useEffect } from "react";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Store, Search } from "@material-ui/icons";
import PageHeader from "../common/PageHeader";
import Controls from "../../common/controls/Controls";
import useTable from "../../common/useTable";
import { Link } from "react-router-dom";
import Edit from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { unitsMap } from "../common/constMaps";

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
}));

const headCells = [
  { id: "title", label: "Title" },
  { id: "category", label: "Category" },
  { id: "netPrice", label: "Display Price" },
  { id: "unitValue", label: "Quantity", disableSorting: true },
  { id: "imageData", label: "Image", disableSorting: true },
  { id: "edit", label: "Edit", disableSorting: true },
];

function Management(props) {
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

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
            to={"/myspace/products/addproduct"}
            className={classes.addProductBtn}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title} </TableCell>
                <TableCell>{item.category} </TableCell>
                <TableCell>{item.totalPrice} </TableCell>
                <TableCell>
                  {`${item.unitValue} ${unitsMap[item.unitSelect]}`}{" "}
                </TableCell>
                <TableCell>
                  <img
                    width={"100px"}
                    height={"100px"}
                    alt={item.title}
                    src={item.imageURL}
                  />
                </TableCell>
                <TableCell>
                  <>
                    <IconButton
                      component={Link}
                      to={`/myspace/products/addproduct/${item.id}`}
                    >
                      <Edit />
                    </IconButton>
                  </>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    products: state.firestore.ordered.products,
    categories: state.firestore.ordered.categories,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "products" }, { collection: "categories" }])
)(Management);
