const StatService = require("./../services/stat_service");

function index(req, res) {
    req.session.views = req.session.views ? req.session.views + 1 : 1;
    res.send(`Welcome you have viewed this page ${req.session.views} time`);
}

function dashboard(req, res) {
    const views = StatService.getPageViews();
    res.render("pages/dashboard", {user: req.session.user, views});
}

module.exports = {
    index,
    dashboard
}