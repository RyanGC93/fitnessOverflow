var express = require('express');
var router = express.Router();

const { asyncHandler, csrfProtection } = require('../utils/utils.js')
const db = require('../db/models')
const { check, validationResult } = require('express-validator');

router.route('/questions/:id(\\d+)/answer/:id2(\\d+)/upvote')
 	.patch( asyncHandler(async (req,res)=>{
		 const questionId = parseInt(req.params.id, 10)
		  const answerId = parseInt(req.params.id2, 10)
	    const { userId } = req.session.auth

        // //   console.log(downvotes)
		
		let existingVote = await db.Vote.findOne({where: {
			userId,
	    	answerId
		}})
		if(existingVote){
			await existingVote.destroy()
		}

	    const vote = await db.Vote.build({
			userId,
			answerId,
			voteType: "upvote"
		})
		
		await vote.save()

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

		let totalUpVotes= upvotes.length
		let totalDownVotes= downvotes.length
		
		let totalVotes = totalUpVotes - totalDownVotes

		res.json({
			title: 'Question',
			totalUpVotes,
			totalDownVotes,
			totalVotes,
			upvotes
		})
	}))

router.route('/questions/:id(\\d+)/answer/:id2(\\d+)/vote')
 	.get( asyncHandler(async (req,res)=>{
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

		let totalUpVotes= upvotes.length
		let totalDownVotes= downvotes.length
		
		let totalVotes = totalUpVotes - totalDownVotes
		res.json({
			totalVotes,
		})  
	  }))

router.route('/questions/:id(\\d+)/answer/:id2(\\d+)/downvote')
	.patch( asyncHandler(async (req,res)=>{
		const questionId = parseInt(req.params.id, 10)
		 const answerId = parseInt(req.params.id2, 10)
	   const { userId } = req.session.auth

	   // //   console.log(downvotes)
	   
	   let existingVote = await db.Vote.findOne({where: {
		   userId,
		   answerId
	   }})
	   if(existingVote){
		   await existingVote.destroy()
	   }
	   
	   const vote = await db.Vote.build({
		   userId,
		   answerId,
		   voteType: "downvote"
	   })
	   await vote.save()

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

	   let totalUpVotes= upvotes.length
	   let totalDownVotes= downvotes.length
	   
	   let totalVotes = totalUpVotes - totalDownVotes

	   res.json({
		   title: 'Question',
		   totalUpVotes,
		   totalDownVotes,
		   totalVotes,
		   upvotes
	   })
		 
	 }))
		.patch( asyncHandler(async (req,res)=>{
		const questionId = parseInt(req.params.id, 10)
		 const answerId = parseInt(req.params.id2, 10)
	   const { userId } = req.session.auth

	   // //   console.log(downvotes)
	   
	   let existingVote = await db.Vote.findOne({where: {
		   userId,
		   answerId
	   }})
	   if(existingVote){
		   await existingVote.destroy()
	   }

	   const vote = await db.Vote.build({
		   userId,
		   answerId,
		   voteType: "upvote"
	   })
	   
	   await vote.save()

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

	   let totalUpVotes= upvotes.length
	   let totalDownVotes= downvotes.length
	   
	   let totalVotes = totalUpVotes - totalDownVotes

	   res.json({
		   title: 'Question',
		   totalUpVotes,
		   totalDownVotes,
		   totalVotes,
		   upvotes
	   })
   }))

module.exports = router
