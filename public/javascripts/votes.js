window.addEventListener("load", (event)=>{
    let questionId = document.getElementById('questionId').innerText

    let votingContainers = document.querySelectorAll(".voting-container")

    votingContainers.forEach(voteContainer =>{
        let answerId = voteContainer.id

        let upvoteButton = voteContainer.childNodes[1]
        let counter = voteContainer.childNodes[2]
        let downvoteButton = voteContainer.childNodes[3]
        
        async function getCurrent_votes() {
            const currentVotes_result = await fetch(`http://localhost:8080/questions/${questionId}/answer/${answerId}/vote`, {
                method: "GET",
                headers:
                    { 'Content': "application/json" }
            });
            let currentVotes_json = await currentVotes_result.json()
            counter.innerHTML=currentVotes_json.totalVotes
        }
        getCurrent_votes()

        upvoteButton.addEventListener("click", async (event) =>{
            let res = await fetch(`http://localhost:8080/questions/${questionId}/answer/${answerId}/upvote`, {
                method: "PATCH",
                headers:
                {'Content': "application/json"}
            })
            const  json  = await res.json()
            counter.innerHTML=json.totalVotes
        })
        
        downvoteButton.addEventListener("click", async (event) =>{
            let res = await fetch(`http://localhost:8080/questions/${questionId}/answer/${answerId}/downvote`, {
                method: "PATCH",
                headers:
                {'Content': "application/json"}
            })
            const  json  = await res.json()
            counter.innerHTML=json.totalVotes
        })
    })
})
