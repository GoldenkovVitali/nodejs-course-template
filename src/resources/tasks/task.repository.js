const tasks = [];

const putOneById = async (id, task) => {
  const indexById = tasks.findIndex(el => el.id === id);

  if (indexById !== -1) {
    const modified = { ...tasks[indexById], ...task };
    tasks[indexById] = modified;
    return modified;
  }
};

const postOne = async task => {
  tasks.push(task);
  return task;
};

const getAll = async () => {
  return tasks;
};

const getOneById = async id => {
  return tasks.find(el => el.id === id);
};

const deleteOneById = async id => {
  const indexById = tasks.findIndex(el => el.id === id);
  if (indexById === -1) throw new Error('NOT_FOUND');
  tasks.splice(indexById, 1);
};

module.exports = { getOneById, getAll, postOne, putOneById, deleteOneById };
