const knex = require("knex")(require("../knexfile"));
const { v4: uuid } = require("uuid");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;


const getItem = (req, res) => {
  knex
    .select("*")
    .from("items")
    .where({ id: req.params.id })
    .then((items) => {
      res.json(items[0]);
    })
    .catch((error) =>
      res.status(400).send(`Error finding item ${error}`)
    );
};

const getAllItem = (req, res) => {
  const decodedToken = jwt.verify(req.headers.authorization.split(" ")[1], secret);
  const userId = decodedToken.id;

  knex
    .select("items.*", "images.image_url as image")
    .from("items")
    .leftJoin("item_images as images", "items.item_id", "images.item_id")
    .where("items.user_id", "!=", userId)
    .then((rows) => {
      const items = rows.reduce((acc, row) => {
        const item = acc.find((i) => i.item_id === row.item_id);
        if (!item) {
          acc.push({ ...row, images: [row.image] });
        } else {
          item.images.push(row.image);
        }
        return acc;
      }, []);
      res.json(items);
      
    })
    .catch((err) => {
      res.status(400).send({ message: "An error occurred while fetching items." });
    });
};


const postItem = (req, res) => {
  const decodedToken = jwt.verify(req.headers.authorization.split(" ")[1], secret);
  const userId = decodedToken.id;

  const { title, description } = req.body;

  knex("items")
    .insert({
      title,
      description,
      user_id: userId
    })
    .then(() => {
      res.status(201).send();
    })
    .catch((err) => {
      res.status(400).send(`Error creating item ${err}`);
    });
};



const deleteItem = (req,res) => {

  knex("items")
 .where({id: req.params.id})
 .del()
 .then((rowsDeleted) => {
    res.status(204).send();
 })
 .catch((err) => {
   res.status(404).send(err);
 });
};

module.exports = {
  getItem,
  postItem,
  getAllItem,
  deleteItem,
};