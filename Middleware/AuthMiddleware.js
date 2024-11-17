const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'No Token, authorization denied' });
    }

    try {
        // Remove "Bearer " prefix if it's included
        const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;

        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
        req.user = decoded;  // Attach the decoded token information to the request object
        next();  // Call the next middleware or route handler
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
}

module.exports = authMiddleware;
