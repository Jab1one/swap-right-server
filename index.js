require("dotenv").config(); 

const express = require("express");
const app = express();
const itemRoute = require("./routes/item");
const likeRoute = require("./routes/like");
const userRoute = require("./routes/user");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/items", itemRoute);
app.use("/likes", likeRoute);
app.use("/users", userRoute);

app.listen(8080, function () {
  console.log("Server is online");
});