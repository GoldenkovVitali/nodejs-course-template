const router = require('express').Router();
const { OK } = require('http-status-codes');
const { catchErrors } = require('../../common/error');
const loginService = require('./login.service');

router.route('/').post(
  catchErrors(async (req, res) => {
    const user = req.body;
    const token = await loginService.connect(user);
    res.status(OK).json({ token });
  })
);

module.exports = router;
