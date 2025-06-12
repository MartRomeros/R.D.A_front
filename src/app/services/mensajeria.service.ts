import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class MensajeriaService {

  mostrarMensajeExito(mensaje: string) {
    Swal.fire({
      icon: "success",
      title: mensaje,
      showConfirmButton: true
    });
  }

  mostrarMensajeError(mensaje: string) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: mensaje,
    });
  }


}
