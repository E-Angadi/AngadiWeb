import React, { useState } from "react";
import useTable from "../../common/useTable";
import {
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Visibility, Search } from "@material-ui/icons";
import Controls from "../../common/controls/Controls";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    padding: theme.spacing(1),
    minHeight: "80vh",
    backgroundColor: "#FFFFFF",
    paddingTop: theme.spacing(2),
  },
  searchInput: {
    width: "100%",
  },
}));

const headCells = [
  { id: "orderId", label: "Order ID", disableSorting: true },
  { id: "date", label: "Date", disableSorting: true },
  { id: "netPrice", label: "Price" },
  { id: "locality", label: "Locality" },
  { id: "view", label: "View", disableSorting: true },
];

// FIXME: orderId is not wraping in tablecell
// FIXME: table content is overflowing on small screen device

const wrapStyle = {
  whiteSpace: "normal",
  wordWrap: "break-word",
};

function OrdersTable({ orders, orderSelected, changeOrderSelected }) {
  const classes = useStyles();
  const [records] = useState(orders);
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
          return items.filter(
            (x) =>
              x.locality.toLowerCase().includes(target.value.toLowerCase()) ||
              x.orderId.toLowerCase().includes(target.value.toLowerCase())
          );
      },
    });
  };

  return (
    <div className={classes.pageContent}>
      <Toolbar>
        <Controls.Input
          label="Search with locality or order id"
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
      </Toolbar>
      <TblContainer>
        <TblHead />
        <TableBody>
          {recordsAfterPagingAndSorting().map((item) => {
            var isSelected = item === orderSelected;
            return (
              <TableRow key={item.orderId}>
                <TableCell style={wrapStyle}>{item.orderId} </TableCell>
                {console.log(item.date)}
                <TableCell>{item.date} </TableCell>
                <TableCell>{item.netPrice} </TableCell>
                <TableCell>{item.locality} </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => changeOrderSelected(item)}
                    disabled={isSelected}
                  >
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </TblContainer>
      <TblPagination />
    </div>
  );
}

export default OrdersTable;
