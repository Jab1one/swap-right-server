const express = require("express");
const router = require("express").Router();
const itemController = require("../controllers/likeController");

router.post("/", itemController.postLike);

module.exports = router;
