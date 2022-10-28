import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubCategory',
      required: true,
    },
    subCategoryId: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
      default: [],
    },
    imgURL: {
      type: Array,
      required: true,
      default: [],
    },
    videoURL: String,

    availability: {
      type: Boolean,
      required: true,
      default: true,
    },
    sizes: {
      type: Array,
      required: true,
      default: [],
    },
    colors: {
      type: Array,
      required: true,
      default: [],
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    priceFactor: {
      type: Number,
      required: true,
      default: 0,
    },
    sale: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Product', ProductSchema);
