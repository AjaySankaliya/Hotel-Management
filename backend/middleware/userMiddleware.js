const { getUser } = require('../service/auth');

const restrictToLoggedInOnly = (req, res, next) => {
    const token = req.cookies?.uid;
    if (!token) return res.redirect('/login?session=expired');

    const user = getUser(token);
    if (!user) {
        res.clearCookie('uid');
        return res.redirect('/login?session=expired');
    }

    req.user = user;
    next();
};

module.exports = restrictToLoggedInOnly;
