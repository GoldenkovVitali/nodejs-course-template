const boardRepo = require('./board.db.repository');
const tasksRepo = require('../tasks/task.db.repository');
const Board = require('./board.model');
const Column = require('./column.model');

const getAll = async () => {
  const boards = await boardRepo.getAll();
  return boards.map(Board.toResponse);
};

const getOneById = async id => {
  const result = await boardRepo.getOneById(id);
  if (result) {
    return Board.toResponse(result);
  }
};

const postOne = async body => {
  const { columns, title = 'title' } = body;
  const newColumns = columns
    ? columns.map(column => {
        const { title: t, order } = column;
        const col = new Column({ title: t, order });
        return { ...col };
      })
    : [];

  const result = await boardRepo.postOne({ title, columns: newColumns });

  return Board.toResponse(result);
};

const putOneById = async (id, board) => {
  const result = await boardRepo.putOneById(id, board);
  if (result) {
    return Board.toResponse(result);
  }
};

const deleteOneById = async boardId => {
  const allTasks = await tasksRepo.getAll();

  const tasks = allTasks
    .filter(task => task.boardId === boardId)
    .map(({ id }) => id);

  for (const id of tasks) {
    await tasksRepo.deleteOneById(id);
  }

  const isDeleted = await boardRepo.deleteOneById(boardId);

  return isDeleted;
};

module.exports = {
  getAll,
  postBoard: postOne,
  getBoard: getOneById,
  putBoard: putOneById,
  deleteBoard: deleteOneById
};
