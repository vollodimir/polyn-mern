import mongoose from 'mongoose';

//всі свойства пользователя
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true, //обовязкове
    },
    lastName: {
      type: String,
      required: true, //обовязкове
    },
    email: {
      type: String,
      required: true,
      unique: true, //унікальне
    },
    passwordHash: {
      type: String,
      required: true,
    },
    isManager: Boolean, //необовязкове
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('User', UserSchema);
