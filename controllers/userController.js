const signUpService = require('../services/signUpService');
const loginService = require('../services/loginService');

const { User } = require('../models/index.js');

const signUp = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const generateToken = await signUpService.signUp(displayName, email, password, image);
    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) {
      return res.status(409).json({ message: 'User already registered' });
    }
    const createUser = await User.create({ displayName, email, password, image });
    return res.status(201).json(generateToken);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const generateToken = await loginService.login(email, password);
    const userIsCorrect = await User.findOne({ where: { email, password } });
    if (!userIsCorrect) {
      return res.status(400).json({ message: 'Invalid fields' });
    }
    return res.status(200).json({ token: generateToken });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const getAll = async (_req, res) => {
  try {
    const users = await User.findAll();
    console.log(users);
    res.status(200).json(users);
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const findUser = await User.findOne({ where: { id } });
    if (!findUser) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    return res.status(200).json(findUser);
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
};

module.exports = { signUp, login, getAll, getById };
