import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient)
  private localUrl = 'http://localhost:3000' //https://r-d-a-server-1.onrender.com

  private alumnosSubject = new BehaviorSubject<any>([])
  alumnosAyudantes$ = this.alumnosSubject.asObservable()
  setAlumnosAyudantes(alumnos:any){
    this.alumnosSubject.next(alumnos)
  }

  findUserbyEmail(): Observable<any> {
    return this.http.get(`${this.localUrl}/user/email`, { withCredentials: true })
  }

  actualizarDatos(valores: any): Observable<any> {
    return this.http.put(`${this.localUrl}/user/update`, valores, { withCredentials: true })
  }

  traerAlumnos():Observable<any>{
    return this.http.get(`${this.localUrl}/user/alumnos`,{withCredentials:true})
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

