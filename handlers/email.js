const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/email');

let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
        user: emailConfig.user,
        pass: emailConfig.pass
    },
});

//generar HTML
 const generarHTML = (archivo, opciones = {}) => {
        console.log(opciones);
     const html = pug.renderFile(`${__dirname}/../views/emails/${archivo}.pug`, opciones);
     return juice(html);
 }

 exports.enviar = async(opciones) => {
     console.log(opciones);
     const html = generarHTML(opciones.archivo, opciones);
     const text = htmlToText.htmlToText(html);
    let opcionesEmail = {
        from: 'UpTask <no-reply@uptask.com>',
        to: opciones.usuario.email,
        subject: opciones.subject,
        text,
        html
    };
    const enviarEmail = util.promisify(transport.sendMail, transport);
    return enviarEmail.call(transport,opcionesEmail);
 }
/*
let mailOptions = {
    from: 'UpTask <no-reply@uptask.com>',
    to: "correo@correo.com",
    subject: "password reset",
    text: "hola",
    html: generarHTML()
}*/
/*let info = transport.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });*/
//transport.sendMail(mailOptions);