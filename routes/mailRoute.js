const express = require('express');
const router = express.Router();

const mailController = require(`../controllers/mailController`);

router.get('/', mailController.loadMailPage);
// router.post('/', mailController.sendMail);
router.post('/', mailController.forgetPasswordMail);

module.exports = router;