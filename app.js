var express = require("express");
var bodyParser = require("body-parser");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/gfg");
var db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("connection succeeded");
});

var app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// app.post("/sign_up", function (req, res) {
//   var name = req.body.name;
//   var email = req.body.email;
//   var pass = req.body.password;
//   var phone = req.body.phone;

//   var walletID = req.body.walletID;
//   var amount = req.body.amount;
//   var password = req.body.password;

//   var data = {
//     name: name,
//     email: email,
//     password: pass,
//     phone: phone,
//     walletID: walletID,
//     amount: amount,
//     password: password,
//   };
//   db.collection("det").insertOne(data, function (err, collection) {
//     if (err) throw err;
//     console.log("Record inserted Successfully");
//   });

//   return res.redirect("signup_success.html");
// });

// --------------------------------------------------------------------------------
app.post("/sign_up", function (req, res) {
  var walletID = req.body.walletID;
  var amount = req.body.amount;
  var password = req.body.password;
  var card_number = req.body.card_number;
  var balance = req.body.balance;
  var card_holder_name = req.body.card_holder_name;
  var expiry_date = req.body.expiry_date;
  var cvv = req.body.cvv;

  // const num1 = parseInt(req.body.balance);
  // const num2 = parseInt(req.body.amount);

  var data = {
    walletID: walletID,
    amount: amount,
    password: password,
  };
  db.collection("transferdb").insertOne(data, function (err, collection) {
    if (err) throw err;
    console.log("Record inserted Successfully");
  });

  var database = {
    card_number: card_number,
    balance: balance,
    card_holder_name: card_holder_name,
    expiry_date: expiry_date,
    cvv: cvv,
  };
  db.collection("add_db").insertOne(database, function (err, collection) {
    if (err) throw err;
    console.log("Money inserted into Wallet Successfully");
  });

  return res.redirect("signup_success.html");
});
// --------------------------------------------------------------------------------

app
  .get("/", function (req, res) {
    res.set({
      "Access-control-Allow-Origin": "*",
    });
    return res.redirect("index.html");
  })
  .listen(3000);

console.log("server listening at port 3000");
