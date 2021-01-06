var express = require('express');
const bcrypt = require('bcryptjs')
var router = express.Router();
const { loginUser, logoutUser } = require('../utils/auth')

const { asyncHandler, csrfProtection } = require('../utils/utils.js')
const db = require('../db/models')
const { check, validationResult } = require('express-validator');

const { requireAuth } = require('../utils/auth')

const voteValidators = [
    check('type')
        .exists({ checkFalsy: true })
        .withMessage('title is missing')
]


router.route('/votes')
 	.patch( asyncHandler(async (req,res)=>{
	 	const answerId = parseInt(req.params.id, 10)
	    const { userId } = req.session.auth
	    const upvotes = await db.Vote.findAll({
	    	where: {
	    	id: answerId,
	    	voteType: "upvote"
	    	}
	    })
	    const downvotes = await db.Vote.findAll({
	    	attributes:['voteTypes'],
	    	where: {
	    	id: answerId,
	    	voteType: "downvote"
	    	}
        })
          console.log(downvotes)
	    let totalUpVotes= upvotes.length
	    let totalDownVotes= downvotes.length
	    const question = db.Vote.build()
	    res.render('create-question', {
	        title: '',
	        question,
	        csrfToken: req.csrfToken()
	    })
	}))
	.post(requireAuth, csrfProtection, voteValidators, asyncHandler(async (req, res) => {
	    const {
	        
	    } = req.body
	
	    const answerId = parseInt(req.params.id, 10)
	    const { userId } = req.session.auth
	    const question = await db.Question.findByPk(questionId)
	
	    const newVote = db.Vote.build({
	        body,
	        userId: userId,
	        voteType
	    })
	
	    const validatorErrors = validationResult(req)
	
	    if (validatorErrors.isEmpty()) {
	        await answer.save();
	        res.redirect(`/questions/${questionId}`)
	    }
	    else {
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

module.exports = router


