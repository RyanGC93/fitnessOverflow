var express = require('express');
var router = express.Router();

const {requireAuth} = require('../utils/auth')
const { asyncHandler, csrfProtection } = require('../utils/utils.js')
const db = require('../db/models')
const { check, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', requireAuth, asyncHandler(async (req,res) =>{
    const questions = await db.Question.findAll({ include: [db.User, db.Answer] , order: [['createdAt', 'DESC']]})
    res.render('index', {title: "Home", questions})
}))

module.exports = router;
