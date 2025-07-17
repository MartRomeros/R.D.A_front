import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ruta } from '../rutas';
import { ActividadAlumno, Alumno, InfoAlumno, ModeloOc, Resumen } from '../../admin/pages/admin-dashboard/models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private http: HttpClient = inject(HttpClient)
  private url: string = ruta

  private resumenMesSubject = new BehaviorSubject<Resumen | null>(null)
  resumenMes$ = this.resumenMesSubject.asObservable();
  setResumenMes(resumen: Resumen) {
    this.resumenMesSubject.next(resumen);
  }

  private actividadesSubject = new BehaviorSubject<ActividadAlumno[]>([]);
  actividades$ = this.actividadesSubject.asObservable();
  setActividades(actividades: ActividadAlumno[]) {
    this.actividadesSubject.next(actividades);
  }

  private alumnosSubject = new BehaviorSubject<InfoAlumno|null>(null);
  infoAlumno$ = this.alumnosSubject.asObservable();
  setInfoAlumno(info: InfoAlumno) {
    this.alumnosSubject.next(info);
  }


  traerAlumnos(): Observable<any> {
    return this.http.get(`${this.url}/admin/alumnos_ayudantes`, { withCredentials: true })
  }

  traerResumenMes(): Observable<any> {
    return this.http.get(`${this.url}/admin/resumen_mes`, { withCredentials: true })
  }

  traerAdmin(): Observable<any> {
    return this.http.get(`${this.url}/admin/`, { withCredentials: true })
  }

  traerDetalleAlumno(run: string): Observable<any> {
    return this.http.get(`${this.url}/admin/info_alumno/${run}`, { withCredentials: true })
  }

  traerActividadesAlumno(run: string): Observable<any> {
    return this.http.get(`${this.url}/admin/actividades_alumno/${run}`, { withCredentials: true })
  }

  registrarOC(run: string, oc: number): Observable<any> {
    return this.http.post(`${this.url}/admin/registrar_oc`, { run, oc }, { withCredentials: true })
  }

  registrarAllOC(dato: ModeloOc[]): Observable<any> {
    return this.http.post(`${this.url}/admin/registrar_all_oc`, { dato }, { withCredentials: true })
  }


}
