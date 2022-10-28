import SubCategoryModel from '../models/SubCategory.js';

//gotovo
export const create = async (req, res) => {
  try {
    const doc = new SubCategoryModel({
      name: req.body.name,
      category: req.body.categoryId,
    });

    const subCategory = await doc.save();

    res.json(subCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Add subCategory error!',
    });
  }
};

//no delete if not empty - zrobyty
export const remove = async (req, res) => {
  try {
    const subCatId = req.params.id;
    SubCategoryModel.findOneAndDelete({ _id: subCatId }, (err, doc) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: 'SubCat not deleted!',
        });
      }
      if (!doc) {
        console.log(err);
        return res.status(404).json({
          message: 'SubCat not found to delete!',
        });
      }
      res.json({ seccess: true });
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: 'SubCat not found!',
    });
  }
};

export const update = async (req, res) => {
  try {
    const subCatId = req.params.id;

    await SubCategoryModel.updateOne(
      { _id: subCatId },
      {
        name: req.body.name,
        category: req.body.categoryId,
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
