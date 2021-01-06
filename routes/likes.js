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


router.route('/questions/:id(\\d+)/answer/:id2(\\d+)/upvotes')
 	.patch( asyncHandler(async (req,res)=>{
		 const questionId = parseInt(req.params.id, 10)
		  const answerId = parseInt(req.params.id2, 10)
	    const { userId } = req.session.auth
	    const upvotes = await db.Vote.findAll({
	    	where: {
			answerId,
	    	voteType: "upvote"
	    	}
	    })
	    const downvotes = await db.Vote.findAll({
	    	where: {
			answerId,
	    	voteType: "downvote"
	    	}
		})

        //   console.log(downvotes)
	    let totalUpVotes= upvotes.length + 1
		let totalDownVotes= downvotes.length
		let totalVotes = (totalUpvotes - totalDownvotes)

	    const vote = db.Vote.build({
			userId,
			answerId,
			voteType: "upvote"
		})

		await vote.save()

		res.json({
			title: 'Question',
			answerId,
			totalVotes
		})
	}))


	// .post(requireAuth, csrfProtection, voteValidators, asyncHandler(async (req, res) => {
	//     const {

	//     } = req.body

	//     const answerId = parseInt(req.params.id, 10)
	//     const { userId } = req.session.auth
	//     const question = await db.Question.findByPk(questionId)

	//     const newVote = db.Vote.build({
	//         body,
	//         userId: userId,
	//         voteType
	//     })

	//     const validatorErrors = validationResult(req)

	//     if (validatorErrors.isEmpty()) {
	//         await answer.save();
	//         res.redirect(`/questions/${questionId}`)
	//     }
	//     else {
	//         const errors = validatorErrors.array().map((error) => error.msg)
	//         res.render('answer-question', {
	//             title: `Answer question ${questionId}`,
	//             answer,
	//             question,
	//             errors,
	//             csrfToken: req.csrfToken(),
	//         })
	//     }
	// }))

module.exports = router
