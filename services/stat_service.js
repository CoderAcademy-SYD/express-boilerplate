function getPageViews() {
    return req.session.views;
}

module.exports = {
    getPageViews
}