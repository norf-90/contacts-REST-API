const multer = require('multer');
const path = require('path');

const tempDir = path.join(__dirname, '..', 'temp');

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    const mime = file.mimetype.split('/');
    const extension = mime[mime.length - 1];
    const name = req.user ? req.user.name : req.body.name;

    cb(null, `${name}_${Date.now()}.${extension}`);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
