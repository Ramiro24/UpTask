const passport = require('passport');
const Usuarios = require('../models/usuarios');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const crypto = require('crypto');
const bcrypt = require('bcrypt-nodejs');
const enviarEmail  = require('../handlers/email')

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
});

exports.usuarioAuntenticado = (req, res, next) => {
    //si el usuario esta 
    if (req.isAuthenticated()) {
        return next();
    }
    //si no lo esta
    return res.redirect('/iniciar-sesion');

}

exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/iniciar-sesion')
    })
}

exports.enviarToken = async (req, res) => {
    console.log(req.body.email);
    const { email } = req.body.email;
    const usuario = await Usuarios.findOne({where: email})

    if(!usuario) {
        req.flash('error', 'No existe esa cuenta');
        res.redirect('/reestablecer')
    }
    //si existe creamos token
    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expiracion = Date.now() + 3600000; 

    await usuario.save();

    const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`;
    console.log(resetUrl);
    //envia el correo con el token
    await enviarEmail.enviar({
        usuario,
        subject: 'password reset',
        resetUrl,
        archivo: 'reestablecer-password'
    });

    //terminar
    req.flash('correcto','Se envió un mensaje a tu correo');
    res.redirect('/iniciar-sesion');
}

exports.validarToken = async (req, res) => {
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token
        }
    });
    console.log(req.params.token);
    console.log(usuario);

    if(!usuario){
        req.flash('error', 'no válido');
        res.redirect('/reestablecer');
    }

    res.render('resetPassword',{
        nombrePagina: 'Reestablecer Contraseña'
    })
}

exports.actualizarPassword = async (req, res) => {
    //verfica token valido y fecha de expiracion 
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token,
            expiracion: {
                [Op.gte] : Date.now()
            }
        } 
     });
     
     if(!usuario){
        req.flash('error','No Válido');
        res.redirect('/reestablecer');
     }
     //hasheando el password
     usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
     usuario.token = null;
     usuario.expiracion = null;
     //guardando nuevo password
     await usuario.save();
     req.flash('correcto', 'Tu password se ha modificado correctamente');
     res.redirect('/iniciar-sesion');
     
}