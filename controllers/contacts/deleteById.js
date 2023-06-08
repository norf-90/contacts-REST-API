const { Contact } = require('../../models/contact');
const { HttpError, ctrlWrapper } = require('../../helpers');

const deleteById = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;

  const result = await Contact.findOneAndDelete({ _id: contactId, owner });
  if (!result) {
    throw HttpError(400, 'Not found');
  }
  res.json({ message: 'contact deleted' });
};

module.exports = {
  deleteById: ctrlWrapper(deleteById),
};
