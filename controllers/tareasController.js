const Proyectos = require('../models/Proyectos')
const Tareas = require('../models/Tareas');

exports.agregarTarea = async (req, res, next) => {
    //obtenemos proyecto actual
    const proyecto = await Proyectos.findOne(
        {
            where: { url: req.params.url }
        }
    );
    //leer el valor del input
    const { tarea } = req.body;
    //estado incompleto
    const estado = 0;
    //id del proyecto
    const ProyectoId = proyecto.id;
    //creando el recurso
    const restultado = Tareas.create({ tarea, estado, ProyectoId });
    //en caso que no haya que pase al siguiente middleware
    if (!restultado) next();
    //redireccion
    res.redirect(`/proyectos/${req.params.url}`);
}

exports.cambiarEstadoTarea = async (req, res, next) => {
    //con req.query no funciona, solo con params
    const { id } = req.params;
    const tarea = await Tareas.findOne({
        where: {
            id
        }
    })
    //cambiando estado
    tarea.estado = tarea.estado == 0 ? 1 : 0;
    //guarando cambios
    const resultado = await tarea.save();

    if(!resultado) next();

    res.status(200).send('Actualizado');
}

exports.eliminarTarea = async (req, res, next) => {
   //aca puedo con res.query o res.params
   const {id} = req.params;
   const resultado = await Tareas.destroy({
       where:{id}
    });

    if(!resultado) next();
    
    res.status(200).send('Eliminado');
}