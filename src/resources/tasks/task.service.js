const { BAD_REQUEST, NOT_FOUND, getStatusText } = require('http-status-codes');
const { ErrorHandler } = require('../../common/error');

const tasksRepo = require('./task.memory.repository');
const boardsRepo = require('../boards/board.memory.repository');
const { TASK_NOT_FOUND } = require('../../common/constants').ERRORS;

const Task = require('./task.model');

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

const getOneById = async (id, taskId) => {
  const board = await boardsRepo.getOneById(id);
  if (!board) {
    throw new ErrorHandler(NOT_FOUND, TASK_NOT_FOUND);
  }

  const result = await tasksRepo.getOneById(taskId);
  if (!result) {
    throw new ErrorHandler(NOT_FOUND, TASK_NOT_FOUND);
  }

  return Task.toResponse(result);
};

const putOneById = async (id, taskId, task) => {
  const board = await boardsRepo.getOneById(id);

  if (!board) {
    throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
  }

  const result = await tasksRepo.putOneById(taskId, task);

  if (!result) {
    throw new ErrorHandler(NOT_FOUND, TASK_NOT_FOUND);
  }
  return Task.toResponse(result);
};

const deleteOneById = async (id, taskId) => {
  const board = await boardsRepo.getOneById(id);
  if (!board) {
    throw new ErrorHandler(NOT_FOUND, TASK_NOT_FOUND);
  }

  const task = await tasksRepo.getOneById(taskId);

  if (!task) {
    throw new ErrorHandler(NOT_FOUND, TASK_NOT_FOUND);
  }

  const isDeleted = await tasksRepo.deleteOneById(taskId);
  return isDeleted;
};

module.exports = {
  getAll,
  postTask: postOne,
  getTask: getOneById,
  putTask: putOneById,
  deleteTask: deleteOneById
};
