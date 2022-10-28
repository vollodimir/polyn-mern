import CategoryModel from '../models/Category.js';
import SubCategoryModel from '../models/SubCategory.js';

export const getAll = async (req, res) => {
  try {
    const category = await CategoryModel.find();
    const subCategory = await SubCategoryModel.find().populate('category').exec();
    res.json({ category, subCategory });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: 'Categories not found!',
    });
  }
};

//nerobe
export const getOne = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: '',
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new CategoryModel({
      name: req.body.name,
      description: req.body.description,
    });

    const category = await doc.save();

    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Add category error!',
    });
  }
};

//no delete if not empty - zrobyty
export const remove = async (req, res) => {
  try {
    const catId = req.params.id;

    CategoryModel.findOneAndDelete({ _id: catId }, (err, doc) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: 'Cat not deleted!',
        });
      }
      if (!doc) {
        console.log(err);
        return res.status(404).json({
          message: 'Cat not found to delete!',
        });
      }
      res.json({ seccess: true });
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: 'Cat not found!',
    });
  }
};

export const update = async (req, res) => {
  try {
    const catId = req.params.id;
    await CategoryModel.updateOne(
      { _id: catId },
      {
        name: req.body.name,
        description: req.body.description,
      },
    );

    res.json({ seccess: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Сan not update Category!',
    });
  }
};
