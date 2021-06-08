const express = require('express');
const Router = express.Router();
//importando express validator
const {body} = require ('express-validator/check');


const proyectosController = require ('../controllers/proyectosController')

module.exports = function () {

    Router.get('/',proyectosController.proyectosHome);
    Router.get('/nuevo-proyecto',proyectosController.formularioProyecto);
    Router.post('/nuevo-proyecto',
    body('nombre').not().isEmpty().trim().escape()
    ,proyectosController.nuevoProyecto);
    //listar proyectos
    Router.get('/proyectos/:url', proyectosController.proyectoUrl);
    return Router;
}

