var express = require('express');

var router = express.Router();
const { Op } = require('sequelize');
const {requireAuth} = require('../utils/auth')
const { asyncHandler, csrfProtection } = require('../utils/utils.js')
const db = require('../db/models')
const { check, validationResult } = require('express-validator');

router.get('/search?search=:query', requireAuth, asyncHandler(async (req,res) =>{
    const questions = await db.Question.findAll({ order: [['createdAt', 'ASC']], where: { title: { [Op.like]: req.params.query } } })
    res.render('index', {title: "Home", questions})
}))



module.exports = router;
