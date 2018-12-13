const UserModel = require("./../database/models/user_model");

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
    res.redirect("/");
}

module.exports = {
    loginForm,
    loginVerify,
    make,
    create,
    logout
}