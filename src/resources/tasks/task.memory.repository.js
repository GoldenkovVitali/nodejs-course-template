const tasks = [];

const getAll = async () => {
  return tasks;
};

const getOneById = async id => {
  return tasks.find(el => el.id === id);
};

const postOne = async task => {
  tasks.push(task);
  return task;
};

const putOneById = async (id, task) => {
  const indexById = tasks.findIndex(el => el.id === id);

  if (indexById !== -1) {
    const modified = { ...tasks[indexById], ...task };
    tasks[indexById] = modified;
    return modified;
  }
};

const deleteOneById = async id => {
  const indexById = tasks.findIndex(el => el.id === id);
  const isDeleted = indexById !== -1;
  if (isDeleted) {
    tasks.splice(indexById, 1);
  }
  return isDeleted;
};

module.exports = { getAll, getOneById, postOne, putOneById, deleteOneById };
