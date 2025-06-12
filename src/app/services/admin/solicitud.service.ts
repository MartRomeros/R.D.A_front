import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Solicitud } from '../../models/interfaces';
import { ActividadService } from '../alumno/actividad.service';
import { ruta } from '../rutas';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private actividadService = inject(ActividadService)
  private http = inject(HttpClient)
  private url = ruta
  private horaCL = Intl.DateTimeFormat('es-CL', {
    timeZone: 'America/Santiago',
    hour: '2-digit',
    minute: '2-digit'
  })

  private fechaCL = new Intl.DateTimeFormat('es-CL', {
    timeZone: 'America/Santiago',
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  })

  private solicitudSubject = new BehaviorSubject<Solicitud[]>([])
  solicitud$ = this.solicitudSubject.asObservable()
  setSolicitud(solicitud: Solicitud[]) {
    solicitud.forEach((soli) => {
      const fechaUTC = new Date(soli.actividad.fecha_actividad)
      const fechaFormateada = this.fechaCL.format(fechaUTC)
      soli.actividad.fecha_actividad = fechaFormateada
      const horaInicUTC = new Date(soli.actividad.hora_inic_activdad)
      const horaInicFormateada = this.horaCL.format(horaInicUTC)
      soli.actividad.hora_inic_activdad = horaInicFormateada
      const horaTermUTC = new Date(soli.actividad.hora_term_actividad)
      const horaTermCL = this.horaCL.format(horaTermUTC)
      soli.actividad.hora_term_actividad = horaTermCL
    })
    this.solicitudSubject.next(solicitud)
  }

  traerSolicitudes(): Observable<any> {
    return this.http.get(`${this.url}/solicitudes`, { withCredentials: true })
  }

  aprobarSolicitud(id: number): Observable<any> {
    return this.http.put(`${this.url}/solicitudes/aprobar/${id}`, {}, { withCredentials: true })
  }

  traerSolicitudId(id: number): Observable<any> {
    return this.http.get(`${this.url}/solicitudes/${id}`, { withCredentials: true })
  }

  formatearFecha(solicitud: any) {
    const fechaUTC = new Date(solicitud.actividad.fecha_actividad)
    const fechaFormateada = this.fechaCL.format(fechaUTC)
    solicitud.actividad.fecha_actividad = fechaFormateada
    const horaInicUTC = new Date(solicitud.actividad.hora_inic_activdad)
    const horaInicFormateada = this.horaCL.format(horaInicUTC)
    solicitud.actividad.hora_inic_activdad = horaInicFormateada
    const horaTermUTC = new Date(solicitud.actividad.hora_term_actividad)
    const horaTermCL = this.horaCL.format(horaTermUTC)
    solicitud.actividad.hora_term_actividad = horaTermCL
    return solicitud
  }


}
