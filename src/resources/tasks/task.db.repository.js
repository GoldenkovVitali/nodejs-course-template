const Task = require('./task.model');

const getAll = async () => {
  const tasks = await Task.find({}).exec();
  return tasks.map(Task.toResponse);
};

const getOneById = async id => {
  const task = await Task.findById(id);
  return task !== null ? task : undefined;
};

const postOne = async data => {
  const task = await Task.create(data);
  return task;
};

const putOneById = async (id, data) => {
  const isUpdate = (await Task.updateOne({ _id: id }, data)).ok;
  return isUpdate === 1 ? data : undefined;
};

const deleteOneById = async id => {
  const isDeleted = (await Task.deleteOne({ _id: id })).ok;
  return isDeleted;
};

module.exports = { getAll, getOneById, postOne, putOneById, deleteOneById };
