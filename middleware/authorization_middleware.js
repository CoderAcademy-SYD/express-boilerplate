function authRedirect(req, res, next) {
    if(req.user) {
        return next();
    }

    res.redirect("/register");
}

module.exports = {
    authRedirect
}