const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const authenticateToken = (req, res, next) => {
    console.log(' Auth Headers:', req.headers);
    const authHeader = req.headers['authorization'];
    console.log(' Auth Header:', authHeader);
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.log(' No token provided');
        return res.status(401).json({
            success: false,
            error: 'Access denied. No token provided.'
        });
    }

    try {
        console.log(' Verifying token with secret:', JWT_SECRET ? ' Secret set' : ' Secret missing');
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(' Token verified:', decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(' Token verification error:', error);
        return res.status(401).json({
            success: false,
            error: 'Invalid token.'
        });
    }
};

module.exports = { authenticateToken };
