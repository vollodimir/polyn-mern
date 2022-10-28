import mongoose from 'mongoose';

//всі свойства пользователя
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, //обовязкове
      unique: true, //унікальне
    },
    text: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
      default: [],
    },
    imgURL: String, //необовязкове
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Post', PostSchema);
