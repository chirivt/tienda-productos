//selectores
const textInfo= document.querySelector("#text-info");

(async() =>{
   
    try {
    
        const token = window.location.pathname.split("/")[3]

        const id = window.location.pathname.split("/")[2]

        const respuesta = await axios.patch(`/api/users/${id}/${token}`)
        console.log("respuesta del back al verificar el usuario", respuesta)
        
          window.location.pathname ="/login/"
        
    } catch (error) {
        
         const mensajeError=error.response.data.error;
         textInfo.innerHTML = mensajeError

    }
   
        
    


})()