const UserModel = require("./../database/models/user_model");

function loginForm(req, res) {
    res.render("authentication/login_form");
}

function loginVerify(req, res) {
    
}

function make(req, res) {
    res.render("authentication/make");
}

async function create(req, res) {
    const user = await UserModel.create(req.body);
    req.session.user = user;
    res.redirect("/dashboard");
}

function logout(req, res) {
    req.session.destroy(() => {
        res.redirect("/");
    });
}

module.exports = {
    loginForm,
    loginVerify,
    make,
    create,
    logout
}