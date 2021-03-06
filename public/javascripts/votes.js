window.addEventListener("load", (event)=>{
    let questionId = document.getElementById('questionId').innerText

    let votingContainers = document.querySelectorAll(".voting-container")

    votingContainers.forEach(voteContainer =>{
        let answerId = voteContainer.id

        let upvoteButton = voteContainer.childNodes[0]
        let counter = voteContainer.childNodes[1]
        let downvoteButton = voteContainer.childNodes[2]

        async function getCurrent_votes() {
            const currentVotes_result = await fetch(`/questions/${questionId}/answer/${answerId}/vote`, {
                method: "GET",
                headers:
                    { 'Content': "application/json" }
            });
            let currentVotes_json = await currentVotes_result.json()
            counter.innerHTML=currentVotes_json.totalVotes
        }
        getCurrent_votes()

        upvoteButton.addEventListener("click", async (event) =>{
            let res = await fetch(`/questions/${questionId}/answer/${answerId}/upvote`, {
                method: "PATCH",
                headers:
                {'Content': "application/json"}
            })
            const  json  = await res.json()
            counter.innerHTML=json.totalVotes
            upvoteButton.src = "/images/upvoted.png"
            downvoteButton.src = "/images/down.png"
        })

        downvoteButton.addEventListener("click", async (event) =>{
            let res = await fetch(`/questions/${questionId}/answer/${answerId}/downvote`, {
                method: "PATCH",
                headers:
                {'Content': "application/json"}
            })
            const  json  = await res.json()
            counter.innerHTML=json.totalVotes
            upvoteButton.src = "/images/up.png"
            downvoteButton.src = "/images/downvoted.png"
        })
    })
})
