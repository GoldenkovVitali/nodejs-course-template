const tasksRepo = require('./task.repository');
const boardsRepo = require('../boards/board.repository');
const {
  BAD_REQUEST,
  TASK_NOT_FOUND
} = require('../../common/variables').ERRORS;

const Task = require('./task.model');

const getOneById = async (id, taskId) => {
  try {
    const board = await boardsRepo.getOneById(id);
    if (!board) {
      throw new Error('NOT_FOUND');
    }

    const result = await tasksRepo.getOneById(taskId);
    if (!result) {
      throw new Error('NOT_FOUND');
    }

    return Task.toResponse(result);
  } catch (err) {
    throw new Error(`TASK_${err.message}`);
  }
};

const getAll = async id => {
  const board = await boardsRepo.getOneById(id);
  if (!board) return;
  const tasks = await tasksRepo.getAll();
  if (!tasks) return [];
  return tasks.filter(({ boardId }) => boardId === id).map(Task.toResponse);
};

const postOne = async (id, taskFields) => {
  const board = await boardsRepo.getOneById(id);
  if (board) {
    const task = new Task({ ...taskFields, boardId: id });
    const result = await tasksRepo.postOne({ ...task });
    return Task.toResponse(result);
  }
};

const deleteOneById = async (id, taskId) => {
  try {
    const board = await boardsRepo.getOneById(id);
    if (!board) {
      throw new Error('NOT_FOUND');
    }

    const task = await tasksRepo.getOneById(taskId);

    if (!task) {
      throw new Error('NOT_FOUND');
    }

    await tasksRepo.deleteOneById(taskId);
  } catch (err) {
    throw new Error(`TASK_${err.message}`);
  }
};

const putOneById = async (id, taskId, task) => {
  const board = await boardsRepo.getOneById(id);

  if (!board) {
    throw new Error(BAD_REQUEST.message);
  }

  const result = await tasksRepo.putOneById(taskId, task);

  if (!result) {
    throw new Error(TASK_NOT_FOUND.message);
  }
  return Task.toResponse(result);
};

module.exports = {
  deleteTask: deleteOneById,
  getAll,
  postTask: postOne,
  getTask: getOneById,
  putTask: putOneById
};
