window.addEventListener("load", (event)=>{
    let questionId = document.getElementById('questionId').innerText

    let votingContainers = document.querySelectorAll(".voting-container")

    votingContainers.forEach(voteContainer =>{
        let answerId = voteContainer.id
        let upvoteButton = voteContainer.childNodes[1]
        let downvoteButton = voteContainer.childNodes[3]
        
        upvoteButton.addEventListener("click", async (event) =>{
            let res = await fetch(`http://localhost:8080/questions/${questionId}/answer/${answerId}/upvote`, {
                method: "PATCH",
                headers:
                {'Content': "application/json"}
            })
            const json = await res.json()
            console.log(json)
        })
        downvoteButton.addEventListener("click", async (event) =>{
            let res = await fetch(`http://localhost:8080/questions/${questionId}/answer/${answerId}/downvote`, {
                method: "PATCH",
                headers:
                {'Content': "application/json"}
            })
            const json = await res.json()
            console.log(json)
        })
    })
    let downvote = document.querySelector('.downVote')

    // upvote.addEventListener('click', patchHandler('upvote'))
    // downvote.addEventListener('click', patchHandler('downVote'))

    async function patchHandler(voteType) {
        fetch('/votes', {
            method: "PATCH",
            headers:
            {'Content': "application/json"}
        })

    }

})
