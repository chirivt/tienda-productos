const loginRouter= require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt");
const usersRouter = require("./users");
const jwt = require("jsonwebtoken");



loginRouter.post("/", async (req,res) =>{
    console.log('en el post del login', req.body)
    // desestructuramos el email y password del body
    const { email, password} = req.body
    console.log('email en login controler', email);

    const correo = String(email).toLowerCase().trim();

    console.log('correo en login controller:', correo);

    //comprobar si el usuario existe en la base de datos
    const userExist = await User.findOne({ email: correo });


    console.log('userExist:', userExist);
    console.log('condicion:', !userExist);

    // si el usuario no existe en la base de datos muestro el error
    if(!userExist){
        return  res.status(400).json({error:"email o contraseña invalida"}) 
    }
    //email
    if (!userExist.verified) {
        return res.status(400).json({error:"Tu email no ha sido verificado"})
    }

    //contraseña  necesitos importa bcrypt y usamos el metodo compare para comparar la contraseña que me llega con la que tengo en la base de datos
     const isCorrect = await bcrypt.compare(password, userExist.passwordHash)
    
     // si la contraseña no es correcta muestro el error
    if (!isCorrect) {
         return  res.status(400).json({ error:"Email o contraseña invalida"})
    }

    const userForToken = {
        id: userExist.id,
    }

    console.log('userForToken:', userForToken);
    
    const accessToken = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d"
    })
     
    // para expirar los tokens en las cookies primero van milisegundos*segundos*horas*dias
    res.cookie("accessToken", accessToken , {
        expires: new Date(Date.now()+ 1000 *60 *60* 24),
        secure: process.env.NODE_ENV === "production",
        // httpOnly lo que hace es que no se pueda acceder a la cookie desde el frontend
        httpOnly: true
    });

     if (userExist.email === process.env.EMAIL_USER) {
                console.log('Redirigiendo al admin');
                
                return res.sendStatus(200)
               
            } else {
                console.log('Redirigiendo al usuario');
                return res.sendStatus(400)
                
    
            }

});


module.exports = loginRouter