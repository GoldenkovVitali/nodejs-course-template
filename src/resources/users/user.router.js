const router = require('express').Router();
const usersService = require('./user.service');
const { ERRORS, MESSAGES } = require('../../common/variables');

/* eslint-disable callback-return */

router.route('/:userId').delete(async (req, res, next) => {
  const { userId } = req.params;

  try {
    await usersService.deleteUser(userId);
    res.status(204).send(MESSAGES.USERDELETED);
  } catch (err) {
    next(ERRORS[err.message] || ERRORS.BAD_REQUEST);
  }
});

router.route('/').get(async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    res.json(users);
  } catch (err) {
    next(ERRORS.BAD_REQUEST);
  }
});

router.route('/:userId').get(async (req, res, next) => {
  const { userId } = req.params;

  const user = await usersService.getUser(userId);
  if (user) {
    res.json(user);
  } else {
    next(ERRORS.NOUSER);
  }
});

router.route('/').post(async (req, res, next) => {
  const { name, login, password } = req.body;

  if (name && login && password) {
    const user = await usersService.postUser({ name, login, password });
    res.json(user);
  } else {
    next(ERRORS.BAD_REQUEST);
  }
});

router.route('/:userId').put(async (req, res, next) => {
  const { userId } = req.params;
  const user = req.body;

  const result = await usersService.putUser(userId, user);
  if (result) {
    res.json(result);
  } else {
    next(ERRORS.BAD_REQUEST);
  }
});

module.exports = router;
