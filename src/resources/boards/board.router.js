const router = require('express').Router();
const boardsService = require('./board.service');

const { ERRORS, MESSAGES } = require('../../common/variables');

/* eslint-disable callback-return */

router.route('/').post(async (req, res, next) => {
  const board = await boardsService.postBoard(req.body);
  if (!board) {
    next(ERRORS.BAD_REQUEST);
  }
  res.json(board);
});

router.route('/').get(async (req, res, next) => {
  try {
    const boards = await boardsService.getAll();
    res.json(boards);
  } catch (err) {
    next(ERRORS.BAD_REQUEST);
  }
});

router.route('/:boardId').put(async (req, res, next) => {
  const { boardId } = req.params;
  const board = req.body;

  const result = await boardsService.putBoard(boardId, board);
  if (result) {
    res.json(result);
  } else {
    next(ERRORS.BAD_REQUEST);
  }
});

router.route('/:boardId').delete(async (req, res, next) => {
  const { boardId } = req.params;

  try {
    await boardsService.deleteBoard(boardId);
    res.status(204).send(MESSAGES.BOARDDELETED);
  } catch (err) {
    next(ERRORS[err.message] || ERRORS.BAD_REQUEST);
  }
});

router.route('/:boardId').get(async (req, res, next) => {
  const { boardId } = req.params;

  const board = await boardsService.getBoard(boardId);
  if (board) {
    res.json(board);
  } else {
    next(ERRORS.NOBOARD);
  }
});

module.exports = router;
