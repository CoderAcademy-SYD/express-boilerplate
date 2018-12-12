const express = require("express");
const router = express.Router();
const PageController = require("./../controllers/page_controller");
const AuthenticationController = require("./../controllers/authentication_controller");
const { celebrate, Joi } = require("celebrate");
const { authorize, authRedirect } = require("./../middleware/authentication_middleware");

router.use("/register", authRedirect);
router.use("/login", authRedirect);

router.get("/", PageController.index);

router.get("/login", AuthenticationController.loginForm);

router.post("/login", celebrate({
    body: {
        email: Joi.string().required(),
        password: Joi.string().required()
    }
}), AuthenticationController.loginVerify);

router.get("/register", AuthenticationController.make);

router.post("/register", celebrate({
    body: {
        email: Joi.string().required(),
        password: Joi.string().required()
    }
}), AuthenticationController.create);

router.get("/logout", AuthenticationController.logout);

router.get("/dashboard", authorize, PageController.dashboard);

module.exports = router;