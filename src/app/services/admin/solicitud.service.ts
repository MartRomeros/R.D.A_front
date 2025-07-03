import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Solicitud } from '../../models/interfaces';
import { ruta } from '../rutas';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private http = inject(HttpClient)
  private url = ruta

  private solicitudSubject = new BehaviorSubject<Solicitud[]>([])
  solicitud$ = this.solicitudSubject.asObservable()
  setSolicitud(solicitud: Solicitud[]) {
    this.solicitudSubject.next(solicitud)
  }


  private allSolicitudesSubject = new BehaviorSubject<Solicitud[]>([])
  allSolicitudes$ = this.allSolicitudesSubject.asObservable()
  setAllSolicitudes(solicitudes: Solicitud[]){
    this.allSolicitudesSubject.next(solicitudes)
  }


  traerSolicitudesMes(): Observable<any> {
    return this.http.get(`${this.url}/admin/solicitudes_mes`, { withCredentials: true })
  }

  traerSolicitudes(): Observable<any> {
    return this.http.get(`${this.url}/admin/solicitudes`, { withCredentials: true })
  }

  aprobarSolicitud(id: number): Observable<any> {
    return this.http.put(`${this.url}/admin/actualizar_solicitud/${id}`, {}, { withCredentials: true })
  }

  traerSolicitudId(id: number): Observable<any> {
    return this.http.get(`${this.url}/admin/solicitud/${id}`, { withCredentials: true })
  }



}
