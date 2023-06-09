const multer = require('multer');
const path = require('path');
const { fileExtension, HttpError } = require('../helpers');

const tempDir = path.join(__dirname, '..', 'temp');

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    const extension = fileExtension(file);
    const name = req.user ? req.user.name : req.body.name;

    cb(null, `${name}_${Date.now()}.${extension}`);
  },
});

const fileFilter = (req, file, cb) => {
  const extension = fileExtension(file);

  if (extension !== 'png' && extension !== 'jpg') {
    cb(HttpError(400, 'File must have only jpeg or png extension'));
  }
  cb(null, true);
};

const upload = multer({
  storage: multerConfig,
  fileFilter,
});

module.exports = upload;
