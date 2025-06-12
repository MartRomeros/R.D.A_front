import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private http:HttpClient = inject(HttpClient)
  private url:string = 'http://localhost:3000'

  traerResumenMes():Observable<any>{
    return this.http.get(`${this.url}/alumno/resumen`,{withCredentials:true})
  }

}
