import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ruta } from './rutas';
import { MensajeriaService } from './mensajeria.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient)
  private mensajeriaService = inject(MensajeriaService)
  private localUrl = ruta


  findUserbyEmail(): Observable<any> {
    return this.http.get(`${this.localUrl}/usuario/`, { withCredentials: true })
  }

  actualizarDatos(valores: any): Observable<any> {
    return this.http.put(`${this.localUrl}/usuario/update`, {newPassword:valores}, { withCredentials: true })
  }

  validarPerfilForm(perfilForm: FormGroup): boolean {

    //validar campos vacios
    if (perfilForm.get('newPassword')?.hasError('required')) {
      this.mensajeriaService.mostrarMensajeError('La contraseña es obligatoria')
      return false
    }
    if (perfilForm.get('newPassword2')?.hasError('required')) {
      this.mensajeriaService.mostrarMensajeError('Es necesario repetir la contraseña')
      return false
    }
    if(perfilForm.get('newPassword')?.hasError('minlength')){
      this.mensajeriaService.mostrarMensajeError('La contraseña debe tener al menos 8 caracteres')
      return false
    }
    if(perfilForm.get('newPassword')?.hasError('maxlength')){
      this.mensajeriaService.mostrarMensajeError('La contraseña no puede tener mas de 50 caracteres')
      return false
    }
    if(perfilForm.get('newPassword2')?.hasError('minlength')){
      this.mensajeriaService.mostrarMensajeError('La contraseña debe tener al menos 8 caracteres')
      return false
    }
    if(perfilForm.get('newPassword2')?.hasError('maxlength')){
      this.mensajeriaService.mostrarMensajeError('La contraseña no puede tener mas de 50 caracteres')
      return false
    }
    if(perfilForm.get('newPassword')?.hasError('pattern')){
      this.mensajeriaService.mostrarMensajeError('La contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial')
      return false
    }
    if(perfilForm.get('newPassword2')?.hasError('pattern')){
      this.mensajeriaService.mostrarMensajeError('La contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial')
      return false
    }

    //verificar que ambas contras sean iguales
    if(perfilForm.get('newPassword')?.value !== perfilForm.get('newPassword2')?.value){
      this.mensajeriaService.mostrarMensajeError('Las contraseñas no coinciden')
      return false
    }
    return true
  }


}

