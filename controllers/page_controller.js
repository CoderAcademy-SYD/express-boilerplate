function index(req, res) {
    req.session.views = req.session.views ? req.session.views + 1 : 1;
    res.send(`Welcome you have viewed this page ${req.session.views} time(s)`);
}

function dashboard(req, res) {
    res.send("Welcome to your dashboard");
}

module.exports = {
    index,
    dashboard
}