const UserModel = require("./../database/models/user_model");
const jwt = require("jsonwebtoken");

function loginForm(req, res) {
    res.render("authentication/login_form");
}

async function loginVerify(req, res) {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.redirect("/login");
    }

    const valid = await user.verifyPassword(password);

    if (!valid) {
        return res.redirect("/login");
    }

    req.session.user = user;
    res.redirect("/dashboard");
}

function make(req, res) {
    res.render("authentication/make");
}

async function create(req, res, next) {
    const user = await UserModel.create(req.body);
    
    req.login(user, (err) => {
        if (err) {
            return next(err);
        }

        res.redirect("/dashboard");
    });
}

function logout(req, res) {
    req.logout();
    res.cookie("jwt", null, { maxAge: -1 });
    res.redirect("/");
}

function generateJWT(req, res) {
    const token = jwt.sign({ sub: req.user._id }, process.env.JWT_SECRET);
    res.cookie("jwt", token);
    res.redirect("/dashboard");
}

module.exports = {
    loginForm,
    loginVerify,
    make,
    create,
    logout,
    generateJWT
}