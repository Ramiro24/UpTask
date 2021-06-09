const express = require('express');
const Router = express.Router();
//importando express validator
const {body} = require ('express-validator/check');


const proyectosController = require ('../controllers/proyectosController')

module.exports = function () {

    Router.get('/',proyectosController.proyectosHome);
    //vista crear
    Router.get('/nuevo-proyecto',proyectosController.formularioProyecto);
    //creacion
    Router.post('/nuevo-proyecto',
    body('nombre').not().isEmpty().trim().escape()
    ,proyectosController.nuevoProyecto);
    //pantalla de un proyecto
    Router.get('/proyectos/:url', proyectosController.proyectoUrl);
    //edita un proyecto
    Router.get('/proyecto/editar/:id', proyectosController.formularioEditar);
    //actualizar proyecto
    Router.post('/nuevo-proyecto/:id',
    body('nombre').not().isEmpty().trim().escape()
    ,proyectosController.actualizarProyecto);
    //eliminar proyecto
    Router.delete('/proyectos/:url', proyectosController.eliminarProyecto);
    
    return Router;
}

