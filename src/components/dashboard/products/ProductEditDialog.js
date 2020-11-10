import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import { Edit, Close } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { getTaxSelect, getUnitSelect } from "../common/constMaps";
import Form from "../../common/Form";
import Grid from "@material-ui/core/Grid";
import Controls from "../../common/controls/Controls";
import useForm from "../../common/useForm";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Clear from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    padding: theme.spacing(3),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const taxSelect = getTaxSelect();

const unitSelect = getUnitSelect();

function ProductEditDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const initialFValues = {
    title: props.product.title,
    description: props.product.description,
    category: props.product.category,
    unitSelect: props.product.unitSelect,
    unitValue: props.product.unitValue,
    price: props.product.price,
    discount: props.product.discount,
    taxes: props.product.taxes,
    visibility: props.product.visibility,
    special: props.product.special,
    taxName: "",
    tax: 0,
    taxSelect: 0,
  };

  const validateTax = (fieldValues = values) => {
    let tmp = { ...errors };
    if ("taxName" in fieldValues)
      tmp.taxName = fieldValues.taxName ? "" : "This field is required.";
    if ("tax" in fieldValues)
      tmp.tax =
        fieldValues.tax >= 0
          ? ""
          : "Tax percentage should be a number and greater than and equal to zero";
    setErrors({
      ...tmp,
    });
    if (fieldValues === values) return tmp.taxName === "" && tmp.tax === "";
  };

  const validate = (fieldValues = values) => {
    let tmp = { ...errors };
    if ("title" in fieldValues)
      tmp.title = fieldValues.title ? "" : "This field is required.";
    if ("description" in fieldValues)
      tmp.description = fieldValues.description
        ? ""
        : "This field is required.";
    if ("category" in fieldValues)
      tmp.category = fieldValues.category
        ? ""
        : "Select a category or create new ";
    if ("unitValue" in fieldValues)
      tmp.unitValue =
        fieldValues.unitValue > 0
          ? ""
          : "Value should be a number and greater then 0";
    if ("price" in fieldValues)
      tmp.price =
        fieldValues.price > 0
          ? ""
          : "Price should be a number and greater then 0";
    if ("discount" in fieldValues)
      tmp.discount =
        fieldValues.discount >= 0
          ? ""
          : "Discount percentage should be a number and greater than or equal to zero";
    setErrors({
      ...tmp,
    });
    if (fieldValues === values)
      return Object.values(tmp).every((x) => x === "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    handleSwitchChange,
  } = useForm(initialFValues, true, validate);

  const calculateTotal = (price, discountPercentage, taxes) => {
    var totalPrice = price;
    for (var taxe in taxes) {
      console.log(taxes[taxe]);
      var taxValue = parseFloat(taxes[taxe].value, 10);
      console.log(taxValue);
      if (taxes[taxe].select === 0) {
        totalPrice -= price * (taxValue / 100);
      } else {
        totalPrice -= taxValue;
      }
      console.log(totalPrice);
    }

    var taxedPrice = totalPrice;
    totalPrice -= totalPrice * (discountPercentage / 100);
    return { taxedPrice, totalPrice };
  };

  const clearTax = (idx) => {
    var tmp = [...values.taxes];
    tmp.splice(idx, 1);
    setValues({
      ...values,
      taxes: tmp,
    });
  };

  const onAddTax = () => {
    if (validateTax()) {
      var tmp = values.taxes;
      tmp.push({
        name: values.taxName,
        select: values.taxSelect,
        value: values.tax,
      });
      setValues({
        ...values,
        taxes: tmp,
        tax: 0,
        taxName: "",
        taxSelect: 0,
      });
    }
  };

  const handleSubmit = () => {
    if (validate()) {
      var discount = parseFloat(values.discount, 10);
      var price = parseFloat(values.price);
      var unitValue = parseFloat(values.unitValue);
      var { taxedPrice, totalPrice } = calculateTotal(
        price,
        discount,
        values.taxes
      );
      taxedPrice = Math.ceil(taxedPrice);
      totalPrice = Math.ceil(totalPrice);
      if (!taxedPrice) {
        alert("Please check your tax and discount values");
        return;
      }
      var res = {
        ...values,
        totalPrice: totalPrice,
        price: price,
        taxedPrice: taxedPrice,
        unitValue: unitValue,
        discount: discount,
      };

      delete res.tax;
      delete res.taxName;
      delete res.taxSelect;

      props.callbackSave(res, props.product);
      setOpen(false);
    }
  };

  return (
    <div>
      <IconButton
        color="primary"
        aria-label={"Edit product info"}
        onClick={handleClickOpen}
      >
        <Edit />
      </IconButton>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Edit Product
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
          <Form onSubmit={handleSubmit}>
            <Grid container spacing={0} justify="center">
              <Grid xs={12} sm={6} item>
                <Controls.Switch
                  name="visibility"
                  label="Product Visibility"
                  value={values.visibility}
                  onChange={handleSwitchChange}
                  color="primary"
                />
                <Controls.Switch
                  name="special"
                  label="Special Offer"
                  value={values.special}
                  onChange={handleSwitchChange}
                  color="primary"
                />
                <Controls.Input
                  name="title"
                  label="Title"
                  value={values.title}
                  onChange={handleInputChange}
                  error={errors.title}
                />
                <Controls.InputArea
                  name="description"
                  label="Description"
                  value={values.description}
                  onChange={handleInputChange}
                  error={errors.description}
                  rowsMax={5}
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <Grid xs={12} item container>
                  <Grid xs={6} item>
                    <Controls.Select
                      name="unitSelect"
                      label="Select Unit"
                      value={values.unitSelect ? values.unitSelect : 0}
                      onChange={handleInputChange}
                      options={unitSelect}
                      error={errors.uniSelect}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <Controls.Input
                      name="unitValue"
                      label="Value"
                      value={values.unitValue}
                      onChange={handleInputChange}
                      error={errors.unitValue}
                    />
                  </Grid>
                </Grid>
                <Grid xs={12} item container>
                  <Grid xs={6} item>
                    <Controls.Input
                      name="price"
                      label="Price"
                      value={values.price}
                      onChange={handleInputChange}
                      error={errors.price}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <Controls.Input
                      name="discount"
                      label="Discount Percentage"
                      value={values.discount}
                      onChange={handleInputChange}
                      error={errors.discount}
                    />
                  </Grid>
                  <Grid xs={12} item container>
                    <Grid xs={12} item>
                      {values.taxes.length > 0 && (
                        <Table
                          style={{ minWidth: 200, marginBottom: 20 }}
                          size="small"
                          aria-label="a dense table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell align="center">
                                <b>Tax Name</b>
                              </TableCell>
                              <TableCell align="center">
                                <b>Value</b>
                              </TableCell>
                              <TableCell align="center">Clear</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {values.taxes.map((tax, idx) => (
                              <TableRow key={idx}>
                                <TableCell
                                  align="center"
                                  component="th"
                                  scope="row"
                                >
                                  {tax.name}
                                </TableCell>
                                <TableCell align="center">
                                  {" "}
                                  {tax.value}
                                  {tax.select === 0 ? "%" : "₹"}{" "}
                                </TableCell>
                                <TableCell align="center">
                                  <IconButton
                                    onClick={() => clearTax(idx)}
                                    size="small"
                                    aria-label="delete"
                                  >
                                    <Clear />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </Grid>
                    <Grid xs={4} item>
                      <Controls.Input
                        name="taxName"
                        label="Tax Name"
                        value={values.taxName}
                        onChange={handleInputChange}
                        error={errors.taxName}
                      />
                    </Grid>
                    <Grid xs={4} item>
                      <Controls.Select
                        name="taxSelect"
                        label="Tax Type"
                        value={values.taxSelect ? values.taxSelect : 0}
                        onChange={handleInputChange}
                        options={taxSelect}
                        error={errors.taxSelect}
                      />
                    </Grid>
                    <Grid xs={4} item>
                      <Controls.Input
                        name="tax"
                        label="Tax Value"
                        value={values.tax}
                        onChange={handleInputChange}
                        error={errors.tax}
                      />
                    </Grid>
                    <Grid xs={12} item>
                      <Controls.Button onClick={onAddTax} text="Add New Tax" />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        </div>
      </Dialog>
    </div>
  );
}

export default ProductEditDialog;
