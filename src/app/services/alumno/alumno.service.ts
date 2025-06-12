import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HorasAreasMes } from '../../alumno/pages/alumno-dashboard/models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private http: HttpClient = inject(HttpClient)
  private url: string = 'https://r-d-a-server.onrender.com'

  private horasAreaMesSubject = new BehaviorSubject<HorasAreasMes>({ comunicacion: 0, desarrollo_laboral: 0, difusion: 0, extension: 0 })
  horasAreaMes$ = this.horasAreaMesSubject.asObservable()
  setHorasAreaMes(horasAreaMes: HorasAreasMes) {
    this.horasAreaMesSubject.next(horasAreaMes)
  }



  traerResumenMes(): Observable<any> {
    return this.http.get(`${this.url}/alumno/resumen`, { withCredentials: true })
  }

  traerActividadesMes(): Observable<any> {
    return this.http.get(`${this.url}/alumno/actividades_mes`, { withCredentials: true })
  }

  traerAreas(): Observable<any> {
    return this.http.get(`${this.url}/alumno/areas`, { withCredentials: true })
  }

  traerHorasAreasMes(): Observable<any> {
    return this.http.get(`${this.url}/alumno/horas_area_mes`, { withCredentials: true })
  }



}
