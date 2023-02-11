const express = require("express");
const router = require("express").Router();
const itemController = require("../controllers/itemController");

router.route("/:id").get(itemController.getItem);

router.get("/", itemController.getAllItem);

router.post("/", itemController.postItem);

router.delete("/:id", itemController.deleteItem);

module.exports = router;