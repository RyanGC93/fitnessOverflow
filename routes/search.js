var express = require('express');

var router = express.Router();
const { Op } = require('sequelize');
const {requireAuth} = require('../utils/auth')
const { asyncHandler, csrfProtection } = require('../utils/utils.js')
const db = require('../db/models')
const { check, validationResult } = require('express-validator');

router.get('/', requireAuth, asyncHandler(async (req,res) =>{
    const queryTerm = req.query.search
    const questions = await db.Question.findAll({include: [db.User, db.Answer], order: [['createdAt', 'DESC']], where: { title: { [Op.iLike]: `%${queryTerm}%` } } })
    res.json({questions})
}))



module.exports = router;
