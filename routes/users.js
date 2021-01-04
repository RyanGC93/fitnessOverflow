var express = require('express');
var router = express.Router();

const { asyncHandler, csrfProtection } = require('../utils/utils.js')
const db = require('../db/models')
const { check, validationResults } = require('express-validator');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup',  )

module.exports = router;
