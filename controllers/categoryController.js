const categoryService = require('../services/categoryService');

const { Category } = require('../models/index.js');

const postCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const testCategory = await categoryService.postCategory(name);
    await Category.create({ name });
    const getCategory = await Category.findOne({ where: { name } });
    return res.status(201).json(getCategory);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).json(categories);
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
};

module.exports = { postCategory, getCategories };
