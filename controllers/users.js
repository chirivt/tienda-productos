const usersRouter = require('express').Router();
const User = require("../models/user")
const bcrypt = require("bcrypt") //importando el modelo user
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer");
const {PAGE_URL}= require("../config");
const { request } = require('express');

//ENDPOINT

//Define la ruta POST para crear un nuevo usuario.
usersRouter.post('/', async (req, res) =>{
  //Desestructura los datos recibidos en el cuerpo de la solicitud.
    const {name, email, password} = req.body;
    console.log(req.body)
    

    //validacion a nivel de backend
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Todos los espacions son requeridos' });
    }

    //Encriptacion de contraseñas, antes de guardar con bcrypt
    
    const saltRounds = 10; //Define el costo de procesamiento para la encriptación.
    const passwordHash = await bcrypt.hash(password, saltRounds); //Cifrado: Encripta la contraseña del usuario antes de guardarla.

    // Crear el nuevo usuario usando el modelo User
    const newUser = new User({
        name,
        email,
        passwordHash,
        verified: false
    });

    // guardar el usuario en al base de datos con el metodo .save()
    const savedUser = await newUser.save();
    console.log('savedUser', savedUser);// respuesta del usuario guardado
    // para crear el token
    const token = jwt.sign({ id: savedUser.id}, process.env.ACCESS_TOKEN_SECRET,{ expiresIn :"1d"} )
    console.log("id del new user:", savedUser.id )
    console.log(token)

    //envio del correo para verificar con nodemailer
    const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

//esto es con nodemailer para mandarle el correo de verificacion al usuario.

(async () => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER, // sender address
      to: savedUser.email, // list of receivers
      subject: "Verificacion de Usuario", // Subject line
    // plantilla literal para el link de verificacion
      html: `<a href="${PAGE_URL}/verify/${savedUser.id}/${token}"> Verificar Correo</a>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail", err);
  }
})();


return res.status(201).json( "Usuario creado. Por Favor verificar tu correo electronico ")


});



usersRouter.patch('/:id/:token', async (req, res) => {

  console.log('req.params verify patch', req.params);
  
 
    try {
        const token = req.params.token;
        //decodedToken me devuelve el token decodificado, jwt.verify para verificar que no ha expirado el token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        console.log('decodedToken', decodedToken);
        //se guarda el id del token decodificado
        const id = decodedToken.id;
        console.log('id decodifcado del token', id);
        

        //Actualizar en base de datos del usuario el verified a true
       const respuesta = await User.findByIdAndUpdate(id, { verified: true });

       console.log('respuesta de mongodb al actualizar el usuario', respuesta);
       
        
        return res.sendStatus(200);

    } catch (error) {
        //Encontra el email del usuario
        const id = req.params.id;
        const { email } = await User.findById(id);
        //Firmar el nuevo token
        const token = jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        
        //Enviar el email
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
            },
        });   

    await transporter.sendMail({
        from: process.env.EMAIL_USER, // 
        to: email, // lista de receptores
        subject: "Verificación de usuario", // linea de asunto
        html: `<a href="${PAGE_URL}/verify/${id}/${token}">Verificar usuario</a>`, // caracteristicas del html
    })

        return res.status(400).json({ error: 'El link ya expiro. Se ha enviado un nuevo link de verificacion'})
    }
});



module.exports = usersRouter;