

const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secret = process.env.JWT_SECRET;

const postLike = async (req, res) => {
  const decodedToken = jwt.verify(req.headers.authorization.split(" ")[1], secret);
  const userId = decodedToken.id;

  const newLike = {
    item_id: req.body.itemId,
    user_id: userId,
  };

  try {
    const data = await knex("likes").insert(newLike);

    console.log(data);
    res.status(201).send(`Like created with ID: ${data[0]}`);
  } catch (err) {
    res.status(400).send(`Error creating like: ${err}`);
  }
};

module.exports = {
  postLike,
};