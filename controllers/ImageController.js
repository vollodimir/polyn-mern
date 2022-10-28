import * as fs from 'fs';

export const singleUpload = async (req, res) => {
  try {
    res.json({
      url: `/uploads/${req.file.originalname}`,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: 'Products not found!',
    });
  }
};

export const arrUpload = async (req, res) => {
  try {
    const uploadFiles = req.files;
    const filenames = [];
    for (let i = 0; i < uploadFiles.length; i++) {
      filenames.push(uploadFiles[i].originalname);
    }
    res.json(filenames);
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: 'Products not found!',
    });
  }
};

export const moveArr = async (req, res) => {
  try {
    const imgArr = req.body.imgURL;
    const folder = req.body.productId;
    //dobavyty perevirok
    if (!fs.existsSync(`uploads/${folder}`)) {
      fs.mkdirSync(`uploads/${folder}`);
    }

    imgArr.forEach((image) =>
      fs.rename(`uploads/temp/${image}`, `uploads/${folder}/${image}`, (err) => {
        console.log(err);
      }),
    );

    for (let i = 0; i < imgArr.length; i++) {}
    res.json({ message: `moved to ${folder}`, imgArr });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: 'Products not found!',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const deleteFiles = req.body.imgURL;
    const folder = req.body.category || 'temp';

    deleteFiles.forEach((image) => {
      fs.unlink(`uploads/${folder}/${image}`, (err) => {
        if (err) console.log(err);
        else console.log(`uploads/${folder}/${image}`, ' was deleted');
      });
    });

    res.json({ message: 'files deleted ', folder, deleteFiles });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: 'Products not found!',
    });
  }
};
