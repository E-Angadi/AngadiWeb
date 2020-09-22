import React, { useState } from "react";
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

// TODO: Remove this sample data and connect it with redux store

const sampleData = [
  {
    id: 0,
    title: "Ravvu",
    category: "floor",
    units: "kilograms",
    unitValue: "1",
    netPrice: 40,
    imageData: "/imgs/default.jpg",
  },
  {
    id: 1,
    title: "Allum",
    category: "floor",
    units: "kilograms",
    unitValue: "1",
    netPrice: 40,
    imageData: "/imgs/default.jpg",
  },
  {
    id: 2,
    title: "apple juice",
    category: "floor",
    units: "litres",
    unitValue: "1",
    netPrice: 40,
    imageData: "/imgs/default.jpg",
  },
];

const headCells = [
  { id: "title", label: "Title" },
  { id: "category", label: "Category" },
  { id: "netPrice", label: "Display Price" },
  { id: "unitValue", label: "Quantity", disableSorting: true },
  { id: "imageData", label: "Image", disableSorting: true },
  { id: "edit", label: "Edit", disableSorting: true },
];

function Management() {
  const classes = useStyles();
  const [records] = useState(sampleData);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

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
            x.title.toLowerCase().includes(target.value)
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
                <TableCell>{item.netPrice} </TableCell>
                <TableCell>{`${item.unitValue} ${item.units}`} </TableCell>
                <TableCell>
                  <img
                    width={"100px"}
                    height={"100px"}
                    alt={item.title}
                    src={item.imageData}
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

export default Management;
