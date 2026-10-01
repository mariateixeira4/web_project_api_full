const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const secret = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({
      message: 'Autorização necessária',
    });
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, secret);
  } catch (err) {
    return res.status(401).send({
      message: 'Token inválido',
    });
  }

  req.user = payload;
  next();
};
