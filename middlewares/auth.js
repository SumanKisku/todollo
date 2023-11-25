// middleware to test if authenticated
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(400).json({
            "message": "You're not authorized to do this action",
        })
    }
}

module.exports = { isAuthenticated }