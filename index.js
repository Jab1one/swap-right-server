require("dotenv").config();
const knex = require("knex")(require(__dirname + "/knexfile"));
const express = require("express");
const app = express();
const bodyParser = require("body-parser");


app.get('/check-database-connection', (req, res) => {
  knex.raw('SELECT 1 as result')
    .then(() => {
      res.status(200).json({ message: 'Database is reachable' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Database is unreachable', details: error.message });
    });
});

///

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const itemRoute = require("./routes/item");
const likeRoute = require("./routes/like");
const userRoute = require("./routes/user");
const matchesRoute = require("./routes/matches");
const cors = require("cors");

app.use(express.static("public"));
app.use(cors({
  origin: "https://swapright.ca",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));
app.use(express.json());

app.use("/items", itemRoute);
app.use("/likes", likeRoute);
app.use("/users", userRoute);
app.use("/matches", matchesRoute);




app.listen(1000, function () {
  console.log("Server is online");
});
