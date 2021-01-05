var express = require('express');

var router = express.Router();
const { Op } = require('sequelize');
const {requireAuth} = require('../utils/auth')
const { asyncHandler, csrfProtection } = require('../utils/utils.js')
const db = require('../db/models')
const { check, validationResult } = require('express-validator');

router.get('/search', requireAuth, asyncHandler(async (req,res) =>{
    const queryTerm = req.query.search
    console.log(queryTerm, typeof queryTerm)
    const questions = await db.Question.findAll({  where: { title: { [Op.iLike]: `%${queryTerm}%` } } })
    res.render('index', {title: "Home", questions})
}))



module.exports = router;
