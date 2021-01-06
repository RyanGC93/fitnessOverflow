window.addEventListener("DOMContentLoaded", (event)=>{
    let searchBox = document.getElementById('search')
    let searchButton = document.getElementById('searchButton')
    searchButton.addEventListener('click', async (event) =>{
        let res = await fetch(`http://localhost:8080/api/search?search=${searchBox.value}`)
        let {questions} = await res.json()
        let questionContainer = document.getElementById('questionContainer')
        questionContainer.innerHTML = ""
        questions.forEach(question =>{
            let ele = document.createElement('li')
            ele.innerHTML = question.title
            ele.classList.add('question')
            questionContainer.appendChild(ele)
        })
    })
})