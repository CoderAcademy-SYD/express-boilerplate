const UserModel = require("./../database/models/user_model");
const jwt = require("jsonwebtoken");

function registerNew(req, res) {
    res.render("authentication/register");
}

async function registerCreate(req, res, next) {
    const { email, password } = req.body;
    const user = await UserModel.create({ email, password });
    
    req.login(user, (error) => {
        if (err) {
            return next(error);
        }

        res.redirect("/dashboard");
    });
}

function loginNew(req, res) {
    res.render("authentication/login");
}

function loginCreate(req, res) {
    const token = jwt.sign({ sub: req.user._id }, process.env.JWT_SECRET);
    res.cookie("jwt", token);
    res.redirect("/dashboard");
}

function logout(req, res) {
    req.logout();
    res.cookie("jwt", null, { maxAge: -1 });
    res.redirect("/");
}

module.exports = {
    registerNew,
    registerCreate,
    loginNew,
    loginCreate,
    logout
}