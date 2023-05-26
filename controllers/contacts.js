const { Contact } = require('../models/contact');
const { HttpError, ctrlWrapper } = require('../helpers');

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

const getById = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;

  console.log(`owner: ${owner}`);
  console.log(`contactId: ${contactId}`);

  const result = await Contact.findOne({ _id: contactId, owner }, '-createdAt -updatedAt').populate(
    'owner',
    'name'
  );

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;

  const result = await Contact.findOneAndDelete({ _id: contactId, owner });
  if (!result) {
    throw HttpError(400, 'Not found');
  }
  res.json({ message: 'contact deleted' });
};

const updateById = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;

  const result = await Contact.findOneAndUpdate({ _id: contactId, owner }, req.body, { new: true });
  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;

  const result = await Contact.findOneAndUpdate({ _id: contactId, owner }, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, 'Not found here');
  }

  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
