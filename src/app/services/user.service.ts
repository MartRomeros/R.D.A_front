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

    //verificar que ambas contras sean iguales
    if(perfilForm.get('newPassword')?.value !== perfilForm.get('newPassword2')?.value){
      this.mensajeriaService.mostrarMensajeError('Las contraseñas no coinciden')
      return false
    }
    return true
  }


}

