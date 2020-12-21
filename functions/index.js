const functions = require("firebase-functions");
const express = require("express");
const bp = require("body-parser");
const cors = require("cors");
const rzp = require("razorpay");
const crypto = require("crypto");

const search = require("./search");

var admin = require("firebase-admin");

admin.initializeApp();

const rz_key = {
  key_id: "rzp_test_lxD9jsRSbpBOAz",
  key_secret: "xxxxxxxxxxxxxxxxxxxx",
};

const instance = new rzp(rz_key);
const app = express();
app.use(cors());
app.use(bp.json());

app.get("/", async (req, res) => res.send("Hello World!"));

app.post("/create_order", async (req, res) => {
  var amount = req.body.amount;
  var order_data = req.body.order_data;
  var user_id = req.body.user_id;
  var user_name = req.body.user_name;
  var address = req.body.delivery;
  var pincode = req.body.pincode;
  var pnum = req.body.pnum;
  var cod = req.body.cod;

  // Cash On delivery
  if (cod) {
    try {
      await admin.firestore().collection("orders").add({
        user_id: user_id,
        user_name: user_name,
        payment_id: "",
        cart: order_data,
        deliverd: false,
        amount: amount,
        completed: true,
        address: address,
        pincode: pincode,
        pnum: pnum,
        cod: true,
        cancelled: false,
        time: new Date(),
      });
      res.json({ msg: "COD ordered placed", code: 200 });
    } catch (err) {
      console.log(err);
      res.json({
        code: 400,
        msg: "Error -  order is added to orders collection",
      });
    }

    return;
  }

  // Razorpay Payment

  if (amount && parseInt(amount)) {
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "USER ID: " + user_id,
    };

    var order_id = null;

    console.log(user_id + "-" + order_data + "-" + amount);

    await instance.orders.create(options, async (err, order) => {
      if (err) {
        console.log(err);
      } else {
        order_id = order.id;
      }
    });

    if (order_id === null) {
      res.json({ code: 400, msg: "error - Razorpay order id not generated" });
      return;
    }

    try {
      await admin.firestore().collection("orders").doc(order_id).set({
        user_id: user_id,
        user_name: user_name,
        payment_id: "",
        cart: order_data,
        amount: amount,
        completed: false,
        address: address,
        pincode: pincode,
        pnum: pnum,
        deliverd: false,
        cod: false,
        cancelled: false,
        time: new Date(),
      });
    } catch (err) {
      console.log(err);
      res.json({
        code: 400,
        msg: "Error -  order is added to orders collection",
      });
      return;
    }

    res.json({ order_id: order_id, code: 200 });
  } else {
    console.log("Error - Order data not received");
    res.json({
      msg: "Error - Order data not received",
      code: 401,
    });
  }
});

async function get_order(order_id) {
  var data = null;
  await admin
    .firestore()
    .collection("orders")
    .doc(order_id)
    .get()
    .then((resp) => {
      data = resp.data();
      return data;
    })
    .catch((e) => console.log(e));

  return data;
}

app.post("/verify_order", async (req, res) => {
  var signature = req.body.razorpay_signature;
  var razorpay_res_order_id = req.body.razorpay_order_id;
  var payment_id = req.body.razorpay_payment_id;

  var data = await get_order(razorpay_res_order_id);

  if (data) {
    if (
      signature ===
      crypto
        .createHmac("SHA256", rz_key.key_secret)
        .update(razorpay_res_order_id + "|" + payment_id)
        .digest("hex")
    ) {
      await admin
        .firestore()
        .collection("orders")
        .doc(razorpay_res_order_id)
        .update({ payment_id: payment_id, completed: true });
      res.json({ code: 200, msg: "payment success" });
    } else {
      res.json({
        msg: "Capturing failed - signature not matched",
        code: 401,
      });
    }
  } else {
    res.json({
      msg: "Capturing failed - order_id not found",
      code: 404,
    });
  }
});

exports.payment = functions.https.onRequest(app);
exports.addFirestoreDataToAlgolia = search.addFirestoreDataToAlgolia;
exports.onProductCreated = search.onProductCreated;
exports.onProductUpdated = search.onProductUpdated;
exports.onProductDeleted = search.onProductDeleted;
