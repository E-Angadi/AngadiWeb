import React, { useState } from "react";
import PageHeader from "../common/PageHeader";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import OrdersTable from "./OrdersTable";
import ReceiptIcon from "@material-ui/icons/Receipt";
import OrderDetails from "./OrderDetails";

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
}));

// TODO: Remove this sample data and connect it with redux store

const sampleData = [
  {
    orderId: "HSHD39483NKDH",
    transactionId: "GDSJHF7EWRWQUER",
    customerName: "Bharath Chandra",
    address:
      "#202, sri kalyan residency, sri venkat sai enclave, eshwar villas road",
    locality: "Nizampet",
    phoneNum: "7981415977",
    date: "22-09-2020",
    time: "5:30 AM",
    netPrice: 500,
    itemsCount: 2,
    paymentType: "Cash on delivery",
    products: [
      {
        productId: "a1",
        title: "Natural ground nut oil",
        price: "200",
        varient: "1 liters",
        imageData: "/imgs/default.jpg",
      },
      {
        productId: "a2",
        title: "Natural sunflower oil",
        price: "300",
        varient: "1.5 liters",
        imageData: "/imgs/default.jpg",
      },
    ],
  },
  {
    orderId: "ADFDFDFW37WEUKJ8",
    transactionId: "MFDSKFJDHF8Y38RWQW",
    customerName: "bharath",
    address:
      "#202, sri kalyan residency, sri venkat sai enclave, eshwar villas road",
    locality: "nizampet",
    phoneNum: "7981415977",
    date: "22-09-2020",
    time: "5:30 AM",
    netPrice: 500,
    itemsCount: 2,
    paymentType: "Net banking",
    products: [
      {
        productId: "a1",
        title: "Natural ground nut oil",
        price: 200,
        varient: "1 liters",
        imageData: "/imgs/default.jpg",
      },
      {
        productId: "a2",
        title: "Natural sunflower oil",
        price: 300,
        varient: "1.5 liters",
        imageData: "/imgs/default.jpg",
      },
      {
        productId: "a3",
        title: "Natural sunflower oil",
        price: 300,
        varient: "1.5 liters",
        imageData: "/imgs/default.jpg",
      },
      {
        productId: "a4",
        title: "Natural sunflower oil",
        price: 300,
        varient: "1.5 liters",
        imageData: "/imgs/default.jpg",
      },
    ],
  },
];

function Orders() {
  const classes = useStyles();
  const [orders] = useState(sampleData);
  const [orderSelected, setOrderSelected] = useState(sampleData[0]);

  const changeOrderSelected = (order) => {
    setOrderSelected(order);
  };

  return (
    <div className={classes.divAlign}>
      <PageHeader
        title={"Manage Orders"}
        icon={<ReceiptIcon fontSize="large" />}
        subTitle={"View and update order status"}
      />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <OrdersTable
            orders={orders}
            orderSelected={orderSelected}
            changeOrderSelected={changeOrderSelected}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <OrderDetails order={orderSelected} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Orders;
