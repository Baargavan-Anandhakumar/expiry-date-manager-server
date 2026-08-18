const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
    let token;

    if (req.cookies.jwtToken) {
        token = req.cookies.jwtToken;
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized to access this route' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');

        req.user = await User.findById(decoded._id).select('-password');
        
        if (!req.user) {
            return res.status(401).json({ message: 'User associated with token no longer exists' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Not authorized to access this route' });
    }
};

module.exports = { protect };
