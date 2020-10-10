const tasksRepo = require('../tasks/task.repository');
const boardRepo = require('./board.repository');
const Column = require('./column.model');
const Board = require('./board.model');

const postOne = async body => {
  const { columns, title } = body;
  const newColumns = columns
    ? columns.map(column => {
        const { title: t, order } = column;
        const col = new Column({ title: t, order });
        return { ...col };
      })
    : [];

  const board = new Board({ title: title || 'title', columns: newColumns });

  const result = await boardRepo.postOne({ ...board });

  return Board.toResponse(result);
};

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

const deleteOneById = async boardId => {
  try {
    const allTasks = await tasksRepo.getAll();

    const tasks = allTasks
      .filter(task => task.boardId === boardId)
      .map(({ id }) => id);

    for (const id of tasks) {
      await tasksRepo.deleteOneById(id);
    }

    await boardRepo.deleteOneById(boardId);
  } catch (err) {
    throw new Error(`BOARD_${err.message}`);
  }
};

const putOneById = async (id, board) => {
  const result = await boardRepo.putOneById(id, board);
  if (result) {
    return Board.toResponse(result);
  }
};

module.exports = {
  deleteBoard: deleteOneById,
  getAll,
  putBoard: putOneById,
  postBoard: postOne,
  getBoard: getOneById
};
