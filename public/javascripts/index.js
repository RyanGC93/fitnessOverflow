

window.addEventListener("DOMContentLoaded", (event)=>{
    let searchBox = document.getElementById('search')
    let searchButton = document.getElementById('searchButton')
    searchButton.addEventListener('click', async (event) =>{
        let res = await fetch(`/api/search?search=${searchBox.value}`)
        let {questions} = await res.json()
        let questionContainer = document.getElementById('questionsContainer')
        questionContainer.innerHTML = ""
        questions.forEach(question =>{
            let container = document.createElement('div')
            container.classList.add('question')

            let link = document.createElement('a')
            link.href = `/questions/${question.id}`
            link.classList.add('questionLink')
            let title = document.createElement('p')
            title.innerText = `Q: ${question.title}`
            let body = document.createElement('p')
            body.innerText = question.body

            let infoLine = document.createElement('div')
            let answerCount = document.createElement('div')
            answerCount.classList.add("answers")
            if(question.Answers){
                answerCount.innerText = "Answers: " + question.Answers.length
            }else{
                answerCount.innerText = "Answers: 0"
            }
            let askerInfo = document.createElement('div')
            askerInfo.classList.add('info')
            askerInfo.innerText = `asked at ${question.createdAt.toString().slice(0,15)} by ${question.User.username}`
            



            questionContainer.appendChild(link)
            link.appendChild(container)
            container.appendChild(title)
            container.appendChild(body)
            container.appendChild(infoLine)
            infoLine.appendChild(answerCount)
            infoLine.appendChild(askerInfo)
        
        })
    })
})