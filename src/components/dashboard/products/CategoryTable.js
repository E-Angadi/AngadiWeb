import React, { useState, useEffect } from "react";
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
  root: {
    padding: theme.spacing(1),
    backgroundColor: "#FFFFFF",
    paddingTop: theme.spacing(2),
  },
}));

const headCells = [
  { id: "category", label: "Category" },
  { id: "view", label: "View", disableSorting: true },
];

function CategoryTable({
  categories,
  categorySelected,
  changeCategorySelected,
}) {
  const classes = useStyles();
  const [records, setRecords] = useState(categories);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  useEffect(() => {
    setRecords(categories);
  }, [categories]);

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    e.preventDefault();
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
    <div className={classes.root}>
      <Toolbar>
        <Controls.Input
          label="Search with category"
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
          {recordsAfterPagingAndSorting().map((item, idx) => {
            var isSelected = item === categorySelected;
            return (
              <TableRow key={idx}>
                <TableCell>{item.title} </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => changeCategorySelected(item)}
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

export default CategoryTable;
