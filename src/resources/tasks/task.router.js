const router = require('express').Router();
const tasksService = require('./task.service');
const { ERRORS, MESSAGES } = require('../../common/variables');

/* eslint-disable callback-return */

router.route('/:boardId/tasks/:taskId').get(async (req, res, next) => {
  const { boardId, taskId } = req.params;

  try {
    const task = await tasksService.getTask(boardId, taskId);
    res.json(task);
  } catch (err) {
    next(ERRORS[err.message] || ERRORS.BAD_REQUEST);
  }
});

router.route('/:boardId/tasks').get(async (req, res, next) => {
  const { boardId } = req.params;
  try {
    const tasks = await tasksService.getAll(boardId);
    res.json(tasks);
  } catch (err) {
    next(ERRORS.BAD_REQUEST);
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req, res, next) => {
  const { boardId, taskId } = req.params;
  const task = req.body;

  try {
    const result = await tasksService.putTask(boardId, taskId, task);
    res.json(result);
  } catch (err) {
    const { TASK_NOT_FOUND, BAD_REQUEST } = ERRORS;
    if (err.message === TASK_NOT_FOUND.message) {
      next(TASK_NOT_FOUND);
    } else {
      next(BAD_REQUEST);
    }
  }
});

router.route('/:boardId/tasks').post(async (req, res, next) => {
  const { boardId } = req.params;

  try {
    const task = await tasksService.postTask(boardId, req.body);
    res.json(task);
  } catch (err) {
    next(ERRORS.BAD_REQUEST);
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res, next) => {
  const { boardId, taskId } = req.params;

  try {
    await tasksService.deleteTask(boardId, taskId);
    res.status(204).send(MESSAGES.TASKDELETED);
  } catch (err) {
    next(ERRORS[err.message] || ERRORS.BAD_REQUEST);
  }
});

module.exports = router;
