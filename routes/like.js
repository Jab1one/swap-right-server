const router = require("express").Router();
const itemController = require("../controllers/likeController");


router.post("/", itemController.postlike);


module.exports = router;