const emailInput = document.querySelector("#email-input")
const passwordInput = document.querySelector("#password-input")
const form = document.querySelector("#form")
const errorText = document.querySelector("#error-text")

form.addEventListener("submit",async  e =>{
    // el e.preventdefault() sirve para que no se recargue la pagina
    e.preventDefault()
    try {
        const user = {
            email: emailInput.value,
            password: passwordInput.value
            }

            console.log("Intentando iniciar sesión con:", user);
            

            const response = await axios.post("/api/login",user);
            console.log('response is:', response);
            

            console.log('Login exitoso');
            
            window.location.pathname =  `/admin/`
  
        
    } catch (error) {
        console.log(error)
        errorText.innerHTML = error.response.data.error
    }
        })