var express = require('express');
const bcrypt = require('bcryptjs')
var router = express.Router();
const { loginUser, logoutUser } = require('../utils/auth')

const { asyncHandler, csrfProtection } = require('../utils/utils.js')
const db = require('../db/models')
const { check, validationResult } = require('express-validator');

const { requireAuth } = require('../utils/auth')

router.get('/ask', requireAuth, csrfProtection, (req,res)=>{
    const question = db.Question.build()
    res.render('create-question', {
        title: 'Ask A Public Question',
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


router.post('/ask', requireAuth, csrfProtection, questionValidators, asyncHandler(async (req, res) => {
    const {
        title,
        body
    } = req.body

    const { userId } = req.session.auth

    const question = db.Question.build({
        title,
        body,
        authorId: userId
    })

    const validatorErrors = validationResult(req)

    if (validatorErrors.isEmpty()) {
        await question.save();
        res.redirect('/')
    }
    else {
        const errors = validatorErrors.array().map((error) => error.msg)
        res.render('create-question', {
            title: 'Ask A Public Question',
            question,
            errors,
            csrfToken: req.csrfToken(),
        })
    }
}))

router.get('/edit/:id(\\d+)', csrfProtection,
    asyncHandler(async (req, res) => {
        const questionId = parseInt(req.params.id, 10);
        const question = await db.Question.findByPk(questionId);
        res.render('edit-question', {
            title: 'Edit Question',
            question,
            csrfToken: req.csrfToken(),
        });
    }));


router.post('/edit/:id(\\d+)', csrfProtection, questionValidators,
    asyncHandler(async (req, res) => {
        const questionId = parseInt(req.params.id, 10);
        const questionToUpdate = await db.Question.findByPk(questionId);
        const {
            title,
            body
        } = req.body;

        const { userId } = req.session.auth

        const park = {
            title,
            body,
            authorId: userId
        };

        const validatorErrors = validationResult(req);

        if (validatorErrors.isEmpty()) {
            await questionToUpdate.update(question);
            res.redirect(`/questions/${questionId}`);
        } else {
            const errors = validatorErrors.array().map((error) => error.msg);
            res.render('edit-question', {
                title: 'Edit Question',
                question: { ...question, id: questionId },
                errors,
                csrfToken: req.csrfToken(),
            });
        }
    }));


module.exports = router
