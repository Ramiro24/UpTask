const passport = require('passport');
const localStratergy = require('passport-local').Strategy;
//referencia al modelo que auntenticamos
const Usuarios = require('../models/usuarios');
//local strategy - login con credenciales
passport.use(
    new localStratergy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async(email, password, done) => {
            try{
                const usuario = await Usuarios.findOne({
                    where: {
                        email,
                        activo: 1
                    }
                });
                //user existe, password incorrect
                if(!usuario.verificarPassword(password)){
                    return done(null,null,{
                        message: 'Password incorrecto'
                    })
                }
                //mail y password correctos
                return done(null,usuario)

            }
            catch(error){
                return done(null,null,{
                    message: 'Esa cuenta no existe'
                })
            }
        }
    )
);

//serializar el usuario

passport.serializeUser((usuario, callback)=>{
    callback(null,usuario);
})

//deserializar el usuario
passport.deserializeUser((usuario, callback)=>{
    callback(null,usuario);
})

//export
module.exports = passport;