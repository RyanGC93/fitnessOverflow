window.addEventListener("load", (event)=>{
    if(document.querySelector('#email')){
    	let email = document.querySelector('#email')
    	email.value="demoUser@demo.com"
    	email.addEventListener('click', ()=>{
    			email.value=""
    	})
    }
    if(document.querySelector('#password')){
        let password = document.querySelector('#password')
        password.value="DemoPass123!"
        password.addEventListener('click', ()=>{
    		password.value=""
    	})
    }
    
    
})


console.log('hello')