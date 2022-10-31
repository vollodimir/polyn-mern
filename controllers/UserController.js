import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SEKRET_KEY,
      {
        expiresIn: '30d', //срок хранения
      },
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалося зареєструватись',
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: 'Невірний логін обо пароль' });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

    if (!isValidPass) {
      return res.status(404).json({ message: 'Невірний логін обо пароль2' });
    }
    ///
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SEKRET_KEY,
      {
        expiresIn: '30d', //срок хранения
      },
    );
    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
    ////
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалося залогінитися',
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found!',
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json({ userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'No access!',
    });
  }
};
