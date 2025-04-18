const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// Load the public key from the PEM file
const PUBLIC_KEY = fs.readFileSync(path.join(__dirname, '../../keys/public.pem'), 'utf8');

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization header missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] });
    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = authMiddleware;
