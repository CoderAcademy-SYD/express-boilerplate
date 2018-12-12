function authorize (req, res, next) {
    if (!req.session || !req.session.user) {
        return res.redirect("/login");
    }
    
    next();
};

function authRedirect (req, res, next) {
    if (req.session && req.session.user) {
        return res.redirect("/dashboard");
    }
    
    next();
};

module.exports = {
    authorize,
    authRedirect
}