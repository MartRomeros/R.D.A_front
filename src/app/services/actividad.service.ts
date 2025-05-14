import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actividad } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  private http = inject(HttpClient)
  private localUrl = 'http://localhost:3000'

  traerActividadesByAlumno(run: string): Observable<any> {
    return this.http.get(`${this.localUrl}/actividad/actividades/${run}`, { withCredentials: true })
  }

  registrarActividad(actividad: Actividad): Observable<any> {
    return this.http.post(`${this.localUrl}/actividad/actividades`, actividad , { withCredentials: true })
  }


}
