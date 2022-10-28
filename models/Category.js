import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, //обовязкове
      unique: true, //унікальне
    },
    description: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Category', CategorySchema);
