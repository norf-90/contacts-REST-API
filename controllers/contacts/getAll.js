const { Contact } = require('../../models/contact');
const { ctrlWrapper } = require('../../helpers');

const getAll = async (req, res) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 10, ...filterValues } = req.query; // filterValues for filter contacts by specific values
  const skip = (page - 1) * limit;

  // find contacts and filter contacts if we have some filterValues
  const result = await Contact.find({ owner, ...filterValues }, '-createdAt -updatedAt', {
    skip,
    limit,
  }).populate('owner', 'name');
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
};
