const router = require('express').Router();
const { BAD_REQUEST, NOT_FOUND, getStatusText } = require('http-status-codes');

const tasksService = require('./task.service');
const { ErrorHandler, catchErrors } = require('../../common/error');
const { ERRORS, MESSAGES } = require('../../common/constants');

/* eslint-disable callback-return */

router
  .route('/:boardId/tasks')
  .get(
    catchErrors(async (req, res) => {
      const { boardId } = req.params;
      const tasks = await tasksService.getAll(boardId);
      if (!tasks) {
        throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
      }
      res.json(tasks);
    })
  )
  .post(
    catchErrors(async (req, res) => {
      const { boardId } = req.params;
      const task = await tasksService.postTask(boardId, req.body);
      if (!task) {
        throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
      }
      res.json(task);
    })
  );

router
  .route('/:boardId/tasks/:taskId')
  .get(
    catchErrors(async (req, res) => {
      const { boardId, taskId } = req.params;
      const task = await tasksService.getTask(boardId, taskId);
      res.json(task);
    })
  )
  .put(
    catchErrors(async (req, res) => {
      const { boardId, taskId } = req.params;
      const task = req.body;
      const result = await tasksService.putTask(boardId, taskId, task);
      res.json(result);
    })
  )
  .delete(
    catchErrors(async (req, res) => {
      const { boardId, taskId } = req.params;
      const isDeleted = await tasksService.deleteTask(boardId, taskId);
      if (!isDeleted) throw new ErrorHandler(NOT_FOUND, ERRORS.TASK_NOT_FOUND);
      res.status(204).send(MESSAGES.DELETE_TASK_SUCCESSFULL_MESSAGE);
    })
  );

module.exports = router;
