const boards = [];

const postOne = async board => {
  boards.push(board);
  return board;
};
const getOneById = async id => {
  return boards.find(el => el.id === id);
};

const getAll = async () => {
  return boards;
};

const deleteOneById = async id => {
  const indexById = boards.findIndex(el => el.id === id);
  if (indexById === -1) throw new Error('NOT_FOUND');
  boards.splice(indexById, 1);
};

const putOneById = async (id, board) => {
  const indexById = boards.findIndex(el => el.id === id);

  if (indexById !== -1) {
    const modified = { ...boards[indexById], ...board };
    boards[indexById] = modified;
    return modified;
  }
};

module.exports = { getAll, postOne, getOneById, putOneById, deleteOneById };
