import mongoose from 'mongoose';

const SubCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, //обовязкове
      unique: true, //унікальне
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('SubCategory', SubCategorySchema);
