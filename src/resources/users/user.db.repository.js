const User = require('./user.model');

const getAll = async () => {
  const users = await User.find({}).exec();
  return users;
};

const getOneById = async id => {
  const user = await User.findById(id);
  return user !== null ? user : undefined;
};

const getOneByLogin = async ({ login }) => {
  const user = (await User.find({ login }).exec())[0];
  return user;
};

const postOne = async data => {
  const user = await User.create(data);
  return user;
};

const putOneById = async (id, data) => {
  const isUpdate = (await User.updateOne({ _id: id }, data)).ok;
  return isUpdate === 1 ? data : undefined;
};

const deleteOneById = async id => {
  const isDeleted = (await User.deleteOne({ _id: id })).ok;
  return isDeleted;
};

module.exports = {
  getAll,
  getOneById,
  postOne,
  putOneById,
  deleteOneById,
  getOneByLogin
};
