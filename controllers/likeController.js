const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secret = process.env.JWT_SECRET;


const postLike = async (req, res) => {
  const decodedToken = jwt.verify(
    req.headers.authorization.split(" ")[1],
    secret
  );
  const userId = decodedToken.id;

  const newLike = {
    item_id: req.body.itemId,
    user_id: userId,
  };

  try {
    const [likeId] = await knex("likes").insert(newLike);

    const [item] = await knex("items")
      .select("user_id")
      .where({ item_id: req.body.itemId });
    const itemOwnerId = item.user_id;

    const [ownerLikes] = await knex("likes")
      .select("user_id")
      .where({ user_id: itemOwnerId });

    const matchingOwnerId = ownerLikes ? itemOwnerId : null;
    const matchingUserId = matchingOwnerId ? userId : null;

    if (matchingUserId && matchingOwnerId) {
      const existingMatch = await knex("matches")
        .select("match_id")
        .where({
          user1_id: matchingUserId,
          user2_id: matchingOwnerId,
        })
        .orWhere({
          user1_id: matchingOwnerId,
          user2_id: matchingUserId,
        })
        .first();

      if (!existingMatch) {
        const newMatch = {
          item1_id: req.body.itemId,
          item2_id: item.item_id,
          user1_id: matchingUserId,
          user2_id: matchingOwnerId,
        };

        await knex("matches").insert(newMatch);

        const [user1, user2] = await knex("users")
          .select("user_id", "user_name")
          .whereIn("user_id", [matchingUserId, matchingOwnerId]);

        res.status(201).send({
          message: `New match created between ${user1.user_name} and ${user2.user_name}`,
          user1_id: user1.user_id,
          user2_id: user2.user_id,
          user1_name: user1.user_name,
          user2_name: user2.user_name,
        });
      } else {
        res.status(200).send("Match already exists");
      }
    } else {
      res.status(200).send("No match found");
    }
  } catch (err) {
    res.status(400).send(`Error creating like: ${err}`);
  }
};

module.exports = {
  postLike,
};
