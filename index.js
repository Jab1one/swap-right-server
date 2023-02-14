require("dotenv").config(); 

const express = require("express");
const app = express();
const bodyParser = require("body-parser");


app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const itemRoute = require("./routes/item");
const likeRoute = require("./routes/like");
const userRoute = require("./routes/user");
const matchesRoute = require("./routes/matches");
const cors = require("cors");

app.use(express.static('public'));
app.use(cors());
app.use(express.json());

app.use("/items", itemRoute);
app.use("/likes", likeRoute);
app.use("/users", userRoute);
app.use("/matches", matchesRoute);

app.listen(8080, function () {
  console.log("Server is online");
});