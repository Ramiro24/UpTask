import axios from "axios";
import Swal from 'sweetalert2';
import {actualizarAvance} from  '../funciones/avance';

const tareas = document.querySelector('.listado-pendientes');

if (tareas) {
  tareas.addEventListener('click', (e) => {
    //cambiando estado de tarea
    if (e.target.classList.contains('fa-check-circle')) {
     
      const icono = e.target;
      const idTarea = icono.parentElement.parentElement.dataset.tarea;
    
      //request hacia /tareas/:id
      const url = `${location.origin}/tareas/${idTarea}`;

      axios.patch(url, { idTarea })
        .then(res => {
          if (res.status === 200)
            icono.classList.toggle('completo');
            actualizarAvance();
        });
    }
    //eliminando tarea
    if (e.target.classList.contains('fa-trash')) {
      const tareaHTML = e.target.parentElement.parentElement,
        idTarea = tareaHTML.dataset.tarea;

      Swal.fire({
        title: 'Deseas borrar esta tarea?',
        text: "Una tarea eliminada no se puede recuperar",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Borrar',
        cancelButtonText: 'No, Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
  
          //enviar delete por medio de axios
          const url = `${location.origin}/tareas/${idTarea}`;
          //siempre que usa delete le pasa params
          axios.delete(url, { params: { idTarea } })
            .then((res) => {
              if (res.status === 200) {
                //eliminar el nodo
                tareaHTML.parentElement.removeChild(tareaHTML);
                //opcional
                Swal.fire(
                  'Tarea eliminada',
                  res.data,
                  'success'
                )
                actualizarAvance();
              }
            })
        }
      })
    }
  });
}

export default tareas;