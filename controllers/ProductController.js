import ProductModel from '../models/Product.js';

export const getAll = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 6,
      search = '',
      colors,
      tags,
      sizes,
      minPrice,
      maxPrice,
      sortBy,
    } = req.query;

    const allColors = await ProductModel.collection.distinct('colors');
    const allTags = await ProductModel.collection.distinct('tags');
    const allSizes = await ProductModel.collection.distinct('sizes');
    const minPriceProduct = await ProductModel.find().sort({ price: 1 });

    const filterPrice =
      minPrice || maxPrice
        ? { $and: [{ price: { $gte: minPrice || 79 } }, { price: { $lte: maxPrice || 600 } }] }
        : {};

    const filter =
      colors || tags || sizes
        ? {
            $or: [
              { colors: { $in: colors?.split(',') } },
              { tags: { $in: tags?.split(',') } },
              { sizes: { $in: sizes?.split(',') } },
            ],
          }
        : {};

    const searchRequest = {
      $and: [{ title: { $regex: search, $options: 'i' } }, filter, filterPrice],
    };

    const sort =
      (sortBy === 'priceUp' && { price: 1 }) ||
      (sortBy === 'priceDown' && { price: -1 }) ||
      (sortBy === 'byName' && { title: 1 });

    const allProducts = await ProductModel.find(searchRequest).count();

    const parameters = {
      allColors,
      allTags,
      allSizes,
      firstPrice: minPriceProduct[0]?.price - minPriceProduct[0]?.price * minPriceProduct[0]?.sale,
      lastPrice:
        minPriceProduct[minPriceProduct.length - 1]?.price -
        minPriceProduct[minPriceProduct.length - 1]?.price *
          minPriceProduct[minPriceProduct.length - 1]?.sale,
    };
    const pagination = {
      page,
      limit,
      pages: Math.ceil(allProducts / limit),
      allProducts,
    };
    const products = await ProductModel.find(searchRequest)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('category')
      .populate('subCategory')
      .exec();

    res.json({
      pagination,
      products,
      parameters,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: 'Products not found!',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId);

    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: 'Product not found!',
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new ProductModel({
      title: req.body.title,
      description: req.body.description,
      text: req.body.text,
      category: req.body.categoryId,
      categoryId: req.body.categoryId,
      subCategory: req.body.subCategoryId,
      subCategoryId: req.body.subCategoryId,
      tags: req.body.tags,
      imgURL: req.body.imgURL,
      videoURL: req.body.videoURL,
      availability: req.body.availability,
      sizes: req.body.sizes,
      colors: req.body.colors,
      price: req.body.price,
      priceFactor: req.body.priceFactor,
      sale: req.body.sale,
    });

    const product = await doc.save();

    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Add product error!',
    });
  }
};

//delete images zrobyty
export const remove = async (req, res) => {
  try {
    const productId = req.params.id;
    ProductModel.findOneAndDelete({ _id: productId }, (err, doc) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: 'Product not deleted!',
        });
      }
      if (!doc) {
        console.log(err);
        return res.status(404).json({
          message: 'Product not found to delete!',
        });
      }
      res.json({ seccess: true });
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: 'Product not found!',
    });
  }
};

export const update = async (req, res) => {
  try {
    const productId = req.params.id;
    await ProductModel.updateOne(
      { _id: productId },
      {
        title: req.body.title,
        description: req.body.description,
        text: req.body.text,
        category: req.body.categoryId,
        categoryId: req.body.categoryId,
        subCategory: req.body.subCategoryId,
        subCategoryId: req.body.subCategoryId,
        tags: req.body.tags,
        imgURL: req.body.imgURL,
        videoURL: req.body.videoURL,
        availability: req.body.availability,
        sizes: req.body.sizes,
        colors: req.body.colors,
        price: req.body.price,
        priceFactor: req.body.priceFactor,
        sale: req.body.sale,
      },
    );

    res.json({ seccess: true });
    // res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Update product failed!',
    });
  }
};
