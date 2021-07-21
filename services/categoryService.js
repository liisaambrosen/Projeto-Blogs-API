require('dotenv/config');

const postCategory = async (name) => {
  if (!name) {
    throw new Error('"name" is required');
  }
  return true;
};

module.exports = {
  postCategory,
};
