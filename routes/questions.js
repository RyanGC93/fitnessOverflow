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

router.get('/:id(\\d+)/edit', requireAuth, csrfProtection,
    asyncHandler(async (req, res) => {
        const questionId = parseInt(req.params.id, 10);
        const question = await db.Question.findByPk(questionId);
        const { userId } = req.session.auth
        console.log("userId:",userId)
        console.log("authorId:",question.authorId)
        res.render('edit-question', {
            title: 'Edit Question',
            question,
            userId,
            csrfToken: req.csrfToken(),
        });
    }));


router.post('/:id(\\d+)/edit', requireAuth, csrfProtection, questionValidators,
    asyncHandler(async (req, res) => {
        const questionId = parseInt(req.params.id, 10);
        const questionToUpdate = await db.Question.findByPk(questionId);
        const {
            title,
            body
        } = req.body;

        const { userId } = req.session.auth

        const question = {
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


router.get('/:id(\\d+)', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10)
    const { userId } = req.session.auth
    const question = await db.Question.findByPk(questionId)
    const answers = await db.Answer.findAll({ where: { questionId: questionId } })
    const downvotes = await db.Vote.findAll({ where: { voteType: "downvote" } })
    const upvotes = await db.Vote.findAll({ where: { voteType: "upvote" } })    
    res.render('show-question', { title: `Question ${questionId}`, question, answers, csrfToken: req.csrfToken(), userId })
}))



router.get('/:id(\\d+)/delete', requireAuth, csrfProtection, asyncHandler(async (req, res) =>{
    const questionId = parseInt(req.params.id, 10)
    const question = await db.Question.findByPk(questionId)
    const {userId} = req.session.auth
    res.render('delete-question', {title: "Delete Question", question, userId, csrfToken: req.csrfToken()})
}))

router.post('/:id(\\d+)/delete', requireAuth, csrfProtection, asyncHandler(async (req, res) =>{
    const questionId = parseInt(req.params.id, 10)
    const question = await db.Question.findByPk(questionId)
    await question.destroy()
    res.redirect('/')
}))
module.exports = router
