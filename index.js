const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const blogPostController = require('./controllers/blogPostController');
const authJwt = require('./middlewares/authJwt');

const app = express();

app.use(bodyParser.json());

app.post('/user', userController.signUp);
app.post('/login', userController.login);
app.get('/user', authJwt, userController.getAll);
app.get('/user/:id', authJwt, userController.getById);
app.post('/categories', authJwt, categoryController.postCategory);
app.get('/categories', authJwt, categoryController.getCategories);
app.post('/post', authJwt, blogPostController.newBlogPost);
app.get('/post', authJwt, blogPostController.getAllPosts);

app.listen(3000, () => console.log('ouvindo na porta 3000!'));
