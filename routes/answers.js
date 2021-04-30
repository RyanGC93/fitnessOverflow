var express = require('express');
const bcrypt = require('bcryptjs')
var router = express.Router();
const { loginUser, logoutUser } = require('../utils/auth')

const { asyncHandler, csrfProtection } = require('../utils/utils.js')
const db = require('../db/models')
const { check, validationResult } = require('express-validator');

const { requireAuth } = require('../utils/auth')

router.get('/:id(\\d+)/answer', requireAuth, csrfProtection, asyncHandler (async(req, res) => {
    const questionId = parseInt(req.params.id, 10)
    const { userId } = req.session.auth
    const question = await db.Question.findByPk(questionId)
    const answer = db.Answer.build()
    res.render('answer-question', {
        title: `Answer question ${question.id}`,
        answer,
        question,
        csrfToken: req.csrfToken()
    })
}))

const answerValidators = [
    check('body')
        .exists({ checkFalsy: true })
        .withMessage('Write something in the textbox to answer the question')
        .isLength({ max: 255 })
        .withMessage('Answer must be less than 255 characters'),
]


router.post('/:id(\\d+)/answer', requireAuth, csrfProtection, answerValidators, asyncHandler(async (req, res) => {
    const {
        body
    } = req.body

    const questionId = parseInt(req.params.id, 10)
    const { userId } = req.session.auth
    const question = await db.Question.findByPk(questionId)

    const answer = db.Answer.build({
        body,
        authorId: userId,
        questionId
    })

    const validatorErrors = validationResult(req)

    if (validatorErrors.isEmpty()) {
        await answer.save();
        res.redirect(`/questions/${questionId}`)
    } else {
        const errors = validatorErrors.array().map((error) => error.msg)
        res.render('answer-question', {
            title: `Answer question ${questionId}`,
            answer,
            question,
            errors,
            csrfToken: req.csrfToken(),
        })
    }
}))


router.get('/:id(\\d+)/answer/:id2(\\d+)/edit', requireAuth, csrfProtection,
    asyncHandler(async (req, res) => {
        const questionId = parseInt(req.params.id, 10);
        const answerId = parseInt(req.params.id2, 10);
        const question = await db.Question.findByPk(questionId);
        const answer = await db.Answer.findByPk(answerId);
        const { userId } = req.session.auth
        res.render('edit-answer', {
            title: 'Edit Answer',
            question,
            answer,
            userId,
            csrfToken: req.csrfToken(),
        });
    }));


router.post('/:id(\\d+)/answer/:id2(\\d+)/edit', requireAuth, csrfProtection, answerValidators,
    asyncHandler(async (req, res) => {
        const questionId = parseInt(req.params.id, 10);
        const question = await db.Question.findByPk(questionId);
        const answerId = parseInt(req.params.id2, 10);
        const answerToUpdate = await db.Answer.findByPk(answerId);
        const {
            body
        } = req.body;

        const { userId } = req.session.auth

        const answer = {
            body,
            authorId: userId,
            questionId,
        };

        const validatorErrors = validationResult(req);

        if (validatorErrors.isEmpty()) {
            await answerToUpdate.update(answer);
            res.redirect(`/questions/${questionId}`);
        } else {
            const errors = validatorErrors.array().map((error) => error.msg);
            res.render('edit-answer', {
                title: 'Edit Answer',
                answer: { ...answer, id: answerId },
                errors,
                question,
                csrfToken: req.csrfToken(),
            });
        }
    }));



router.get('/:id(\\d+)/answer/:id2(\\d+)/delete', requireAuth, csrfProtection,
    asyncHandler(async (req, res) => {
        const questionId = parseInt(req.params.id, 10);
        const answerId = parseInt(req.params.id2, 10);
        // const question = await db.Question.findByPk(questionId);
        const answer = await db.Answer.findByPk(answerId);
        const { userId } = req.session.auth
        res.render('delete-answer', { title: "Delete Answer", questionId, answer, userId, csrfToken: req.csrfToken() })
    }))

router.post('/:id(\\d+)/answer/:id2(\\d+)/delete', requireAuth, csrfProtection,
    asyncHandler(async (req, res) => {
        const questionId = parseInt(req.params.id, 10);
        const answerId = parseInt(req.params.id2, 10);
        // const question = await db.Question.findByPk(questionId);
        const answer = await db.Answer.findByPk(answerId);
        await answer.destroy()
        res.redirect(`/questions/${questionId}`)
    }))

module.exports = router
