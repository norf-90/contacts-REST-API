const fileExtension = file => {
  const mimetype = file.originalname.split('.');
  const extension = mimetype[mimetype.length - 1];
  return extension;
};

module.exports = fileExtension;
