const jimp = require('jimp');

const imgResizing = async file => {
  const { path } = file;
  const avatar = await jimp.read(path);
  avatar.resize(150, 150);
  avatar.writeAsync(path);
};

module.exports = imgResizing;
