import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HorasArea, HorasAreasMes } from '../../alumno/pages/alumno-dashboard/models/interfaces';
import { ruta } from '../rutas';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private http: HttpClient = inject(HttpClient)
  private url: string = ruta

  private horasAreaMesSubject = new BehaviorSubject<HorasArea[]>([])
  horasAreaMes$ = this.horasAreaMesSubject.asObservable()
  setHorasAreaMes(horasAreaMes: HorasArea[]) {
    this.horasAreaMesSubject.next(horasAreaMes)
  }



  traerResumenMes(): Observable<any> {
    return this.http.get(`${this.url}/alumno/total_mes`, { withCredentials: true })
  }

  traerActividadesMes(): Observable<any> {
    return this.http.get(`${this.url}/alumno/actividades_mes`, { withCredentials: true })
  }

  traerAreas(): Observable<any> {
    return this.http.get(`${this.url}/area_trabajo/`, { withCredentials: true })
  }

  traerHorasAreasMes(): Observable<any> {
    return this.http.get(`${this.url}/alumno/horas_area_actual`, { withCredentials: true })
  }

  obtenerOC():Observable<any>{
    return this.http.get(`${this.url}/alumno/traer_oc`,{withCredentials:true})
  }



}
