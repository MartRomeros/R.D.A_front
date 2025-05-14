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
  private rendelUrl = 'https://r-d-a-server-1.onrender.com'

  traerActividadesByAlumno(run: string): Observable<any> {
    return this.http.get(`${this.rendelUrl}/actividad/actividades/${run}`, { withCredentials: true })
  }

  registrarActividad(actividad: Actividad): Observable<any> {
    return this.http.post(`${this.rendelUrl}/actividad/actividades`, actividad , { withCredentials: true })
  }
  


}
