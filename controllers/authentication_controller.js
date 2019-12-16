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

module.exports = {
    registerNew,
    registerCreate
}