const express = require("express");
const router = express.Router();
const PageController = require("./../controllers/page_controller");
const AuthenticationContoller = require("./../controllers/authentication_controller");
const { celebrate, Joi, Segments } = require("celebrate");

router.get("/", PageController.index);

router.get("/register", AuthenticationContoller.registerNew);

router.post("/register", celebrate({
    [Segments.BODY]: {
        email: Joi.string().required(),
        password: Joi.string().required()
    }
}), AuthenticationContoller.registerCreate);

router.get("/dashboard", PageController.dashboard);

module.exports = router;