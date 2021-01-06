window.addEventListener("DOMContentLoaded", (event)=>{
    let searchBox = document.getElementById('search')
    let searchButton = document.getElementById('searchButton')
    searchButton.addEventListener('click', async (event) =>{
        let res = await fetch(`http://localhost:8080/api/search?search=${searchBox.value}`)
        let {questions} = await res.json()
        let questionContainer = document.getElementById('questionContainer')
        questionContainer.innerHTML = ""
        questions.forEach(question =>{
            let container = document.createElement('div')
            ele.classList.add('questionContainer')

            let link = document.createElement('a')
            link.href = `/questions/${question.id}`
            link.classList.add('question')
            link.innerText = `Q: ${question.title}`

            let body = document.createElement('p')
            body.innerText = question.body

            let infoLine = document.createElement('div')
            let answerCount = document.createElement('div')
            if(questions.Answers){
                answerCount.innerText = questions.Answers.length
            }
            else{
                answerCount.innerText = 0
            }
            let askerInfo = document.createElement('div')
            askerInfo.innerText = `asked at ${question.createdAt.toString().slice(0,15)} by ${question.User.username}`

            ele.appendChild(link)
            ele.appendChild(body)
            infoLine.appendChild(answerCount)
            infoLine.appendChild(askerInfo)
            ele.appendChild(infoLine)
            questionContainer.appendChild(ele)
        })
    })
})