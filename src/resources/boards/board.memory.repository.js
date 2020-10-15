const boards = [];

const getAll = async () => {
  return boards;
};

const getOneById = async id => {
  return boards.find(el => el.id === id);
};

const postOne = async board => {
  boards.push(board);
  return board;
};

const putOneById = async (id, board) => {
  const indexById = boards.findIndex(el => el.id === id);

  if (indexById !== -1) {
    const modified = { ...boards[indexById], ...board };
    boards[indexById] = modified;
    return modified;
  }
};

const deleteOneById = async id => {
  const indexById = boards.findIndex(el => el.id === id);
  const isDeleted = indexById !== -1;
  if (isDeleted) {
    boards.splice(indexById, 1);
  }
  return isDeleted;
};

module.exports = { getAll, postOne, getOneById, putOneById, deleteOneById };
