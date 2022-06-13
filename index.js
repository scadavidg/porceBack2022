//const functions = require("firebase-functions");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const appRoutes = require("./routes/index");

app.use(morgan("dev"));

app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/process", appRoutes.processRoutes);

var port = process.env.PORT
var host = process.env.HOST
app.listen(port, host)
console.log(`Running on http://${host}:${port}`)

//exports.app = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
