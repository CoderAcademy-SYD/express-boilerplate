function index(req, res) {
    req.session.views = req.session.views ? req.session.views + 1 : 1;
    res.send(`Welcome you have viewed this page ${req.session.views} time(s)`);
}

function dashboard(req, res) {
    res.render("pages/dashboard", {user: req.session.user});
}

module.exports = {
    index,
    dashboard
}