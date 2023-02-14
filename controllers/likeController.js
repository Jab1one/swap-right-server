

const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secret = process.env.JWT_SECRET;

// const postLike = async (req, res) => {
//   const decodedToken = jwt.verify(req.headers.authorization.split(" ")[1], secret);
//   const userId = decodedToken.id;

//   const newLike = {
//     item_id: req.body.itemId,
//     user_id: userId,
//   };

//   try {
//     const data = await knex("likes").insert(newLike);

//     console.log(data);
//     res.status(201).send(`Like created with ID: ${data[0]}`);
//   } catch (err) {
//     res.status(400).send(`Error creating like: ${err}`);
//   }
// };

// module.exports = {
//   postLike,
// };

const postLike = async (req, res) => {
  const decodedToken = jwt.verify(req.headers.authorization.split(" ")[1], secret);
  const userId = decodedToken.id;

  const newLike = {
    item_id: req.body.itemId,
    user_id: userId,
  };

  try {
    const [likeId] = await knex("likes").insert(newLike);
    const [item] = await knex("items").select("user_id").where({ item_id: req.body.itemId });
    const itemOwnerId = item.user_id;

    if (itemOwnerId !== userId) {
      const newMatch = {
        item1_id: req.body.itemId,
        item2_id: item.item_id,
        user1_id: userId,
        user2_id: itemOwnerId,
      };

      await knex("matches").insert(newMatch);
    }

    res.status(201).send(`Like created with ID: ${likeId}`);
  } catch (err) {
    res.status(400).send(`Error creating like: ${err}`);
  }
};

module.exports = {
  postLike,
};
  
  
  
  
  