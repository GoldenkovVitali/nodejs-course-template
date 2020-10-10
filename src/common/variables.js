const MESSAGES = {
  USERDELETED: 'User has been deleted',
  BOARDDELETED: 'Board has been deleted',
  TASKDELETED: 'Task has been deleted'
};

const ERRORS = {
  NOUSER: { code: 404, message: 'User not found' },
  NOBOARD: { code: 404, message: 'Board not found' },
  BAD_REQUEST: { code: 400, message: 'Bad request' },
  TASK_NOT_FOUND: { code: 404, message: 'Task not found' }
};

module.exports = { ERRORS, MESSAGES };
