const { getUser } = require('../service/auth');

const adminOnly = (req, res, next) => {
  try {
    const token = req.cookies?.uid;
    if (!token) return res.status(401).json({ message: 'Unauthorized: No token' });

    const user = getUser(token);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Admin Middleware Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = adminOnly;
