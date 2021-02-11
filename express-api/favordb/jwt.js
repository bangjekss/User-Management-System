const jwt = require('jsonwebtoken');

const createToken = (payload) => {
  return jwt.sign(payload, 'qwerty', {
    expiresIn: '24h',
  });
};
const checkToken = (req, res, next) => {
  if (req.method !== 'OPTIONS') {
    jwt.verify(req.token, 'qwerty', (err, decoded) => {
      if (err) return res.status(401).send({ status: 'Unauthorized', message: 'token expired' });
      req.user = decoded;
      console.log(decoded);
      next();
    });
  }
};

module.exports = {
  createToken,
  checkToken,
};
