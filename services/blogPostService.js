require('dotenv/config');

const validatePost = (title, content, categoryIds) => {
  if (title === undefined) {
    return '"title" is required';
  }
  if (content === undefined) {
    return '"content" is required';
  }
  if (categoryIds === undefined) {
    return '"categoryIds" is required';
  }
  return undefined;
};

const newBlogPost = (title, content, categoryIds) => {
  const invalidPost = validatePost(title, content, categoryIds);

  if (invalidPost) {
    throw new Error(invalidPost);
  }
  return true;
};

module.exports = {
  newBlogPost,
};
