import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const excludedPaths = ['/api/login/login', '/api/login/register'];
  if (excludedPaths.includes(req.path)) {
    return next(); // Skip middleware for paths in the excludedPaths array
  }
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
