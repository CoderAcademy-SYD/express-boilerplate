const express = require("express");
const router = express.Router();
const PageController = require("./../controllers/page_controller");

router.get("/", PageController.index);

module.exports = router;