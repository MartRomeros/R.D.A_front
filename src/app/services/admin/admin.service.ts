import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ruta } from '../rutas';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private http: HttpClient = inject(HttpClient)
  private url: string = ruta  



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

  traerActividadesAlumno(run:string):Observable<any>{
    return this.http.get(`${this.url}/admin/actividades_alumno/${run}`,{withCredentials:true})
  }


}
