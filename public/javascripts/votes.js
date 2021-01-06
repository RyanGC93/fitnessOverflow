window.addEventListener("load", (event)=>{
    let upvote = document.querySelector(".upVote")
    let downvote = document.querySelector('.downVote')

    upvote.addEventListener('click', patchHandler('upvote'))
    downvote.addEventListener('click', patchHandler('downVote'))

    async function patchHandler(voteType) {
        fetch('/votes', {
            method: "PATCH",
            headers:
            {'Content': "application/json"}
        })

    }

})
