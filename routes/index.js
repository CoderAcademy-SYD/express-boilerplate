const express = require("express");
const router = express.Router();
const PageController = require("./../controllers/page_controller");
const AuthenticationContoller = require("./../controllers/authentication_controller");
const { celebrate, Joi, Segments } = require("celebrate");
const { authRedirect } = require("./../middleware/authorization_middleware");

router.get("/", PageController.index);

router.get("/register", AuthenticationContoller.registerNew);

router.post("/register", celebrate({
    [Segments.BODY]: {
        email: Joi.string().required(),
        password: Joi.string().required()
    }
}), AuthenticationContoller.registerCreate);

router.get("/dashboard", authRedirect, PageController.dashboard);

router.get("/login", AuthenticationContoller.loginNew);

router.post("/login", celebrate({
    [Segments.BODY]: {
        email: Joi.string().required(),
        password: Joi.string().required()
    }
}), AuthenticationContoller.loginCreate);

router.get("/logout", AuthenticationContoller.logout);

module.exports = router;