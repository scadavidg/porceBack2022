require("dotenv").config(); // Dllo
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

const port = process.env.PORT;
const host = process.env.HOST;
app.listen(port, host);
