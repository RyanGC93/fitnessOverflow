var express = require('express');
const bcrypt = require('bcryptjs')
var router = express.Router();
const { loginUser, logoutUser } = require('../utils/auth')

const { asyncHandler, csrfProtection } = require('../utils/utils.js')
const db = require('../db/models')
const { check, validationResult } = require('express-validator');


router.get('/ask', csrfProtection, (req,res)=>{
    const question = db.Question.build()
    res.render('create-question', {
        title: 'Ask a public Question',
        question,
        csrfToken: req.csrfToken()
    })
})


const questionValidators = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('title is missing')
        .isLength({ max: 50 })
        .withMessage('title must be less than 50 characters'),
    check('body')
        .exists({checkFalsy: true})
        .withMessage('body is missing')
        .isLength({ max: 255 })
        .withMessage('Question must be less than 255 characters'),
]
