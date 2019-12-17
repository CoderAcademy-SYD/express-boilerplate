const StatService = require("./../services/stat_service");

function index(req, res) {
    req.session.views = req.session.views ? req.session.views + 1 : 1;
    res.send(`Welcome you have viewed this page ${req.session.views} time`);
}

function dashboard(req, res) {
    res.render("pages/dashboard", {user: req.user});
}

module.exports = {
    index,
    dashboard
}