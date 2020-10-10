const users = [];

const putOneById = async (id, user) => {
  const indexById = users.findIndex(el => el.id === id);

  if (indexById !== -1) {
    const modified = { ...users[indexById], ...user };
    users[indexById] = modified;
    return modified;
  }
};

const deleteOneById = async id => {
  const indexById = users.findIndex(el => el.id === id);
  if (indexById === -1) throw new Error('NOT_FOUND');
  users.splice(indexById, 1);
};

const getAll = async () => {
  return users;
};

const getOneById = async id => {
  return users.find(el => el.id === id);
};

const postOne = async user => {
  users.push(user);
  return user;
};

module.exports = { getAll, getOneById, postOne, putOneById, deleteOneById };
