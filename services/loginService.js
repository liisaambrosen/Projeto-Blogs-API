const jwt = require('jsonwebtoken');

require('dotenv/config');

const jwtConfig = {
  expiresIn: '10d',
  algorithm: 'HS256',
};

const validateUser = (email, password) => {
  if (email === undefined) {
    return '"email" is required';
  }
  if (password === undefined) {
    return '"password" is required';
  }
  if (email.length === 0) {
    return '"email" is not allowed to be empty';
  }
  if (password.length === 0) {
    return '"password" is not allowed to be empty';
  }
  return undefined;
};

const login = async (email, password) => {
  const invalidUser = validateUser(email, password);

  if (invalidUser) {
    throw new Error(invalidUser);
  }

  const token = jwt.sign({ email, password }, process.env.JWT_SECRET, jwtConfig);
  return token;
};

module.exports = {
  login,
};
