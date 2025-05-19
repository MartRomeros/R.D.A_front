import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Actividad } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  private http = inject(HttpClient)
  private localUrl = 'http://localhost:3000'//pruebas locales
  private rendelUrl = 'https://r-d-a-server-1.onrender.com' //pruebas

  private actividadesSubject = new BehaviorSubject<Actividad[]>([])
  actividades$ = this.actividadesSubject.asObservable()

  setActvidades(nuevasActividades: Actividad[]) {
    this.actividadesSubject.next(nuevasActividades)
  }

  getActividades(): Actividad[] {
    return this.actividadesSubject.getValue()
  }

  traerActividadesByAlumno(run: string): Observable<any> {
    return this.http.get(`${this.rendelUrl}/actividad/actividades/${run}`, { withCredentials: true })
  }

  registrarActividad(actividad: Actividad): Observable<any> {
    return this.http.post(`${this.rendelUrl}/actividad/actividades`, actividad, { withCredentials: true })
  }



}
