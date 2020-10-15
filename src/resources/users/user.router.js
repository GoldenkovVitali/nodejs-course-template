const router = require('express').Router();
const { BAD_REQUEST, NOT_FOUND, getStatusText } = require('http-status-codes');

const usersService = require('./user.service');
const { ErrorHandler, catchErrors } = require('../../common/error');
const { ERRORS, MESSAGES } = require('../../common/constants');

/* eslint-disable callback-return */

router
  .route('/')
  .get(
    catchErrors(async (req, res) => {
      const users = await usersService.getAll();
      res.json(users);
    })
  )
  .post(
    catchErrors(async (req, res) => {
      const { name, login, password } = req.body;

      if (name && login && password) {
        const user = await usersService.postUser({ name, login, password });
        res.json(user);
      } else {
        throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
      }
    })
  );

router
  .route('/:userId')
  .get(
    catchErrors(async (req, res) => {
      const { userId } = req.params;

      const user = await usersService.getUser(userId);
      if (!user) {
        throw new ErrorHandler(NOT_FOUND, ERRORS.USER_NOT_FOUND);
      }
      res.json(user);
    })
  )
  .put(
    catchErrors(async (req, res) => {
      const { userId } = req.params;
      const user = req.body;

      const result = await usersService.putUser(userId, user);
      if (!result) {
        throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
      }
      res.json(result);
    })
  )
  .delete(
    catchErrors(async (req, res) => {
      const { userId } = req.params;

      const isDeleted = await usersService.deleteUser(userId);
      if (!isDeleted) {
        throw new ErrorHandler(NOT_FOUND, ERRORS.USER_NOT_FOUND);
      }
      res.status(204).send(MESSAGES.DELETE_USER_SUCCESSFULL_MESSAGE);
    })
  );

module.exports = router;
