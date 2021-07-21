const jwt = require('jsonwebtoken');

require('dotenv/config');

const jwtConfig = {
  expiresIn: '10d',
  algorithm: 'HS256',
};

const validatePassword = (password) => {
  if (!password) {
    return '"password" is required';
  }
  if (password.length < 6) {
    return '"password" length must be 6 characters long';
  }
  return undefined;
};

const validateUser = (displayName, email) => {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (displayName.length < 8) {
    return '"displayName" length must be at least 8 characters long';
  }
  if (!email) {
    return '"email" is required';
  }
  if (!regex.test(email)) {
    return '"email" must be a valid email';
  }
  return undefined;
};

const signUp = async (displayName, email, password, image) => {
  const invalidUser = validateUser(displayName, email);
  const invalidPassword = validatePassword(password);

  if (invalidUser) {
    throw new Error(invalidUser);
  }
  if (invalidPassword) {
    throw new Error(invalidPassword);
  }
  const token = jwt.sign({ displayName, email, image }, process.env.JWT_SECRET, jwtConfig);
  return token;
};

module.exports = {
  signUp,
};
