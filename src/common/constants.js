const ERRORS = {
  TASK_NOT_FOUND: 'Task not found',
  USER_NOT_FOUND: 'User not found',
  BOARD_NOT_FOUND: 'Board not found',
  INCORRECT_LOGIN_OR_PASSWORD: 'Incorrect login or password'
};

const MESSAGES = {
  DELETE_TASK_SUCCESSFULL_MESSAGE: 'The task has been deleted',
  DELETE_USER_SUCCESSFULL_MESSAGE: 'The user has been deleted',
  DELETE_BOARD_SUCCESSFULL_MESSAGE: 'The board has been deleted'
};

const SALT_ROUNDS = 10;

module.exports = { ERRORS, MESSAGES, SALT_ROUNDS };
