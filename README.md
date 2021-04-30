



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <!-- <a href="https://github.com/RyanGC93/fitnessOverflow"> -->
    <img src="https://i.imgur.com/UNfh52l.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Fitness Overflow</h3>

  <p align="center">
    A fitness/health based clone of Stack Overflow
    <br />
    <a href="https://github.com/RyanGC93/fitnessOverflow"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="http://fitness-overflow.herokuapp.com/users/login">View Demo</a>
    .
    <a href="https://github.com/RyanGC93/fitnessOverflow/wiki">Wiki</a>
    ·
    <a href="https://github.com/RyanGC93/fitnessOverflow/issues">Report Bug</a>
    ·
    <a href="https://github.com/RyanGC93/fitnessOverflow/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Fitness Overflow is a fitness and health clone of Stack Overflow. Users are able to browse, ask,search, answer and vote on fitness and health related questions. The site uses User-based session authentication to interact with the website and access these features. 

## Feature Highlights

### Ajax Based Voting on Answers

- Users can vote on answers which via handled by ajax
- A fetch request is made to the server which will update votes on the server and return a json object so the DOM reflects the change


### Ajax based search

- A fetch request is made using the input of our search bar to make an api request to the server using the search route to query the database and returning results that title matches the search criteria and updating the DOM using AJAX.


## Project Challenges

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Fitness Overflow is a fitness and health clone of Stack Overflow. Users are able to browse, ask,search, answer and vote on fitness and health related questions. The site uses User-based session authentication to interact with the website and access these features. 

## Code Snippets

### Code Snippet: API route for upvote/downvote
```js
window.addEventListener("load", (event)=>{
    let questionId = document.getElementById('questionId').innerText

    let votingContainers = document.querySelectorAll(".voting-container")

    votingContainers.forEach(voteContainer =>{
        let answerId = voteContainer.id
	// code removed for brevity
 	}
	// code removed for brevity
        upvoteButton.addEventListener("click", async (event) =>{
            let res = await fetch(`/questions/${questionId}/answer/${answerId}/upvote`, {
                method: "PATCH",
                headers:
                {'Content': "application/json"}
            })
            const  json  = await res.json()
            counter.innerHTML=json.totalVotes
        })
})

router.patch('/:id(\\d+)/answer/:id2(\\d+)/downvote', asyncHandler(async (req,res)=>{
		const questionId = parseInt(req.params.id, 10)
		const answerId = parseInt(req.params.id2, 10)
	   const { userId } = req.session.auth

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
```
### Code Snippet: API Route For Search Functionality 
```js

router.get('/', requireAuth, asyncHandler(async (req,res) =>{
    const queryTerm = req.query.search
    const questions = await db.Question.findAll({include: [db.User, db.Answer], order: [['createdAt', 'DESC']], where: { title: { [Op.iLike]: `%${queryTerm}%` } } })
    res.json({questions})
}))
```

### Project Challenges
1. Implementing the upvote/downvote functionality
   - The challenge we encountered when implementing the upvote/down feature is getting the necessary information to make a fetch request.(the answer id and question id) We overcame this particular challenge by creating unique IDs that can be reference for each answer and using the id to pass the information.
2. The git workflow
   - The gitworkflow involving branching, merging branches and pull requests was diffcult at first because we werent use to this type of workflow. To overcome this challenge we took our time and consulted with each other to make sure that each movement for this workflow was correct 


### Built With

* [Javascript](https://www.javascript.com/)
* [CSS]()
* [Pug](https://pugjs.org/api/getting-started.html)
* [PostgreSQL](https://www.postgresql.org/)
* [Express](https://expressjs.com/)



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/RyanGC93/fitnessOverflow.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_



<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/RyanGC93/fitnessOverflow/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - Fitness Overflow

Project Link: [https://github.com/RyanGC93/fitnessOverflow](https://github.com/RyanGC93/fitnessOverflow)



<!-- ACKNOWLEDGEMENTS --







<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/RyanGC93/fitnessOverflow.svg?style=for-the-badge
[contributors-url]: https://github.com/RyanGC93/fitnessOverflow/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/RyanGC93/fitnessOverflow.svg?style=for-the-badge
[forks-url]: https://github.com/RyanGC93/fitnessOverflow/network/members
[stars-shield]: https://img.shields.io/github/stars/RyanGC93/fitnessOverflow.svg?style=for-the-badge
[stars-url]: https://github.com/RyanGC93/fitnessOverflow/stargazers
[issues-shield]: https://img.shields.io/github/issues/RyanGC93/fitnessOverflow.svg?style=for-the-badge
[issues-url]: https://github.com/RyanGC93/fitnessOverflow/issues
[license-shield]: https://img.shields.io/github/license/RyanGC93/fitnessOverflow.svg?style=for-the-badge
[license-url]: https://github.com/RyanGC93/fitnessOverflow/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/RyanGC93
