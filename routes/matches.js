
const express = require("express");
const router = require("express").Router();
const itemController = require("../controllers/matchesController");

router.get("/my-matches", itemController.getMyMatches);
router.delete("/:id", itemController.deletematch);

module.exports = router;



