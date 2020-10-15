const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const User = require('./user.model');

const getAll = async () => {
  const users = await usersRepo.getAll();
  return users.map(User.toResponse);
};

const getOneById = async id => {
  const result = await usersRepo.getOneById(id);
  if (result) {
    return User.toResponse(result);
  }
};

const postOne = async ({ name, login, password }) => {
  const user = new User({ name, login, password });

  const result = await usersRepo.postOne({ ...user });
  return User.toResponse(result);
};

const putOneById = async (id, user) => {
  const result = await usersRepo.putOneById(id, user);
  if (result) {
    return User.toResponse(result);
  }
};

const deleteOneById = async userId => {
  const allTasks = await tasksRepo.getAll();

  const tasks = allTasks.filter(task => task.userId === userId);

  for (const task of tasks) {
    await tasksRepo.putOneById(task.id, { ...task, userId: null });
  }

  const isDeleted = await usersRepo.deleteOneById(userId);
  return isDeleted;
};

module.exports = {
  getAll,
  getUser: getOneById,
  postUser: postOne,
  putUser: putOneById,
  deleteUser: deleteOneById
};
