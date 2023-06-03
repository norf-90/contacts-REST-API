const fileExtension = file => {
  const mimetype = file.mimetype.split('/');
  const extension = mimetype[mimetype.length - 1];
  return extension;
};

module.exports = fileExtension;
