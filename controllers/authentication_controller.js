const UserModel = require("./../database/models/user_model");

function registerNew(req, res) {
    res.render("authentication/register");
}

async function registerCreate(req, res) {
    const { email, password } = req.body;
    const user = await UserModel.create({ email, password });
    req.session.user = user;
    res.redirect("/dashboard");
}

function loginNew(req, res) {
    res.render("authentication/login");
}

function loginCreate(req, res) {
    res.json(req.body);
}

function logout(req, res) {
    req.session.destroy(() => {
        res.redirect("/");
    });
}

module.exports = {
    registerNew,
    registerCreate,
    loginNew,
    loginCreate,
    logout
}