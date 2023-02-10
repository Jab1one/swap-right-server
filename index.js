
const express = require("express");
const app = express();
const warehouseRoute = require("./routes/warehouse");
const inventoryRoute = require("./routes/inventory");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.static("./public"));
app.use("/warehouses", warehouseRoute);
app.use("/inventories", inventoryRoute);

app.listen(8080, function () {
  console.log("Server online");
});