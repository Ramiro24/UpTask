import Swal from "sweetalert2";

export const actualizarAvance = () => {
    //seleccionar tareas existentes
    const Tareas = document.querySelectorAll('li.tarea');

    if (Tareas.length) {
        //seleccionar tareas completadas
        const tareasCompletadas = document.querySelectorAll('i.completo');
        //calcular el avance
        const avance = Math.round((tareasCompletadas.length / Tareas.length) * 100);
        //mostrar el avance
        const porcentaje = document.querySelector('#porcentaje');
        porcentaje.style.width = avance + '%';

        if (avance == 100) {
            Swal.fire(
                'Completaste el proyecto',
                'Felicidades has completado el proyecto',
                'success'
            )
        }
    }

}