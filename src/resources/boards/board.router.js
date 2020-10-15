const router = require('express').Router();
const { BAD_REQUEST, NOT_FOUND, getStatusText } = require('http-status-codes');

const boardsService = require('./board.service');
const { ErrorHandler, catchErrors } = require('../../common/error');
const { ERRORS, MESSAGES } = require('../../common/constants');
/* eslint-disable callback-return */

router
  .route('/')
  .get(
    catchErrors(async (req, res) => {
      const boards = await boardsService.getAll();
      res.json(boards);
    })
  )
  .post(
    catchErrors(async (req, res) => {
      const board = await boardsService.postBoard(req.body);
      res.json(board);
    })
  );

router
  .route('/:boardId')
  .get(
    catchErrors(async (req, res) => {
      const { boardId } = req.params;

      const board = await boardsService.getBoard(boardId);
      if (!board) {
        throw new ErrorHandler(NOT_FOUND, ERRORS.BOARD_NOT_FOUND);
      }
      res.json(board);
    })
  )
  .put(
    catchErrors(async (req, res) => {
      const { boardId } = req.params;
      const board = req.body;

      const result = await boardsService.putBoard(boardId, board);
      if (!result) {
        throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
      }
      res.json(result);
    })
  )
  .delete(
    catchErrors(async (req, res) => {
      const { boardId } = req.params;

      const isDeleted = await boardsService.deleteBoard(boardId);
      if (!isDeleted) {
        throw new ErrorHandler(NOT_FOUND, ERRORS.BOARD_NOT_FOUND);
      }
      res.status(204).send(MESSAGES.DELETE_BOARD_SUCCESSFULL_MESSAGE);
    })
  );

module.exports = router;
