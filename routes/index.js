const express = require('express');
const Router = express.Router();
//importando express validator
const { body } = require('express-validator/check');


const proyectosController = require('../controllers/proyectosController')
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');

module.exports = function () {

    Router.get('/',
        authController.usuarioAuntenticado,
        proyectosController.proyectosHome);

    //#region Proyecto

    //vista crear
    Router.get('/nuevo-proyecto',
        authController.usuarioAuntenticado,
        proyectosController.formularioProyecto);
    //creacion
    Router.post('/nuevo-proyecto',
        authController.usuarioAuntenticado,
        body('nombre').not().isEmpty().trim().escape()
        , proyectosController.nuevoProyecto);
    //pantalla de un proyecto
    Router.get('/proyectos/:url',
        authController.usuarioAuntenticado,
        proyectosController.proyectoUrl);
    //edita un proyecto
    Router.get('/proyecto/editar/:id', proyectosController.formularioEditar);
    //actualizar proyecto
    Router.post('/nuevo-proyecto/:id',
        authController.usuarioAuntenticado,
        body('nombre').not().isEmpty().trim().escape()
        , proyectosController.actualizarProyecto);
    //eliminar proyecto
    Router.delete('/proyectos/:url',
        authController.usuarioAuntenticado,
        proyectosController.eliminarProyecto);

    //#endregion Proyecto

    //#region Tareas

    //crear tarea
    Router.post('/proyectos/:url',
        authController.usuarioAuntenticado,
        tareasController.agregarTarea);
    //actualizar tarea
    Router.patch('/tareas/:id',
        authController.usuarioAuntenticado,
        tareasController.cambiarEstadoTarea);
    //eliminar tarea
    Router.delete('/tareas/:id',
        authController.usuarioAuntenticado,
        tareasController.eliminarTarea);

    //#endregion Tareas

    //#region Cuenta
    Router.get('/crear-cuenta', usuariosController.formcrearcuenta);
    Router.post('/crear-cuenta', usuariosController.crearCuenta);
    Router.get('/confirmar/:correo', usuariosController.confirmarCuenta);
    //#endregion Cuenta

     //#region iniciar sesion
    Router.get('/iniciar-sesion', usuariosController.formInicialSesion);
    Router.post('/iniciar-sesion', authController.autenticarUsuario);
    Router.get('/cerrar-sesion', authController.cerrarSesion);
    Router.get('/reestablecer', usuariosController.formReestablecerPassword);
    Router.post('/reestablecer',authController.enviarToken);
    Router.get('/reestablecer/:token',authController.validarToken);
    Router.post('/reestablecer/:token', authController.actualizarPassword);
    //#endregion iniciar sesion

    return Router;
}

