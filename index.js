import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors'; //відключає блокування зі сторонніх доменів

import { chekAuth, handlValidationErr } from './utils/index.js';
import {
  registerValidation,
  loginValidation,
  PostValidation,
  ProductValidation,
  CategoryValidation,
  SubCategoryValidation,
} from './validations.js';
import {
  UserController,
  PostController,
  ProductController,
  CategoryController,
  SubCategoryController,
  ImageController,
} from './controllers/index.js';

mongoose
  .connect(
    'mongodb+srv://vovavova:vova2pzvova@cluster0.hqu4hqc.mongodb.net/polyn?retryWrites=true&w=majority',
  )
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('Error', err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    ///адрес
    cb(null, 'uploads/temp');
  },
  filename: (_, file, cb) => {
    // имя ф-ла
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10485760,
  },
});

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

//User
app.post('/auth/register', registerValidation, handlValidationErr, UserController.register);
app.post('/auth/login', loginValidation, handlValidationErr, UserController.login);
app.get('/auth/me', chekAuth, UserController.getMe);

//Img
app.post('/upload/single', chekAuth, upload.single('image'), ImageController.singleUpload);
app.post('/upload/array', chekAuth, upload.array('image[]'), ImageController.arrUpload);
app.post('/upload/move', ImageController.moveArr);
app.delete('/upload/remove', ImageController.remove);

//Post
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', chekAuth, PostValidation, handlValidationErr, PostController.create);
app.delete('/posts/:id', chekAuth, PostController.remove);
app.patch('/posts/:id', chekAuth, PostValidation, handlValidationErr, PostController.update);

//Product
app.get('/product', ProductController.getAll);
app.get('/product/:id', ProductController.getOne);
app.post(
  '/product',
  chekAuth,
  ProductValidation,
  handlValidationErr,
  upload.array('imgURL'),
  ProductController.create,
);
app.delete('/product/:id', chekAuth, ProductController.remove);
app.patch(
  '/product/:id',
  chekAuth,
  ProductValidation,
  handlValidationErr,
  ProductController.update,
);

//Category
app.get('/category', CategoryController.getAll);
app.post('/category', chekAuth, CategoryValidation, handlValidationErr, CategoryController.create);
app.delete('/category/:id', chekAuth, CategoryController.remove);
app.patch(
  '/category/:id',
  chekAuth,
  CategoryValidation,
  handlValidationErr,
  CategoryController.update,
);

//SubCategory
app.post(
  '/subcategory',
  chekAuth,
  SubCategoryValidation,
  handlValidationErr,
  SubCategoryController.create,
);
app.delete('/subcategory/:id', chekAuth, SubCategoryController.remove);
app.patch('/subcategory/:id', chekAuth, SubCategoryController.update);

app.listen(4444, (err) => {
  if (err) {
    return console.log('Error', err);
  } else {
    return console.log('Server OK');
  }
});
