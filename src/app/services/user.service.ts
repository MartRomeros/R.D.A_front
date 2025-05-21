import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient)
  private localUrl = 'http://localhost:3000'
  private rendelUrl = 'https://r-d-a-server-1.onrender.com'

  findUserbyEmail(): Observable<any> {
    return this.http.get(`${this.rendelUrl}/user/user/email`, { withCredentials: true })
  }

  actualizarDatos(valores: any): Observable<any> {
    return this.http.put(`${this.rendelUrl}/user/update`, valores, { withCredentials: true })
  }

  validarPerfilForm(perfilForm: FormGroup): boolean {

    //validar campos vacios
    if (perfilForm.get('fono')?.hasError('required')) {
      alert('fono es requerido')
      return false
    }
    if (perfilForm.get('contrasenna1')?.hasError('required')) {
      alert('contrasenna es requerida')
      return false
    }
    if (perfilForm.get('contrasenna2')?.hasError('required')) {
      alert('es necesario repetir la contrasenna')
      return false
    }

    //verificar que ambas contras sean iguales
    if(perfilForm.get('contrasenna1')?.value !== perfilForm.get('contrasenna2')?.value){
      alert('las contrasenas deben coincidir')
      return false
    }


    return true
  }


}

