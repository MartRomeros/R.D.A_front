import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Actividad,DetallesAlumno } from '../../models/interfaces';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  private http = inject(HttpClient)
  private url = 'http://localhost:3000'//pruebas locales

  private now = new Date();
  private month = String(this.now.getMonth() + 1).padStart(2, '0'); // getMonth() devuelve 0-11
  private year = this.now.getFullYear();
  private mesAnio = `${this.month}${this.year}`;

  //variables como total del pago, total de horas trabajadas(año y mes) etc
  private horasTotalesSubject = new BehaviorSubject<number | null>(null);
  horasTotales$ = this.horasTotalesSubject.asObservable()
  setHorasTotales(horasTotales: number) {
    this.horasTotalesSubject.next(horasTotales)
  }

  private horasPorAreaSubject = new BehaviorSubject<DetallesAlumno>({ actividadesPorMes: [] })
  horasPorArea$ = this.horasPorAreaSubject.asObservable()
  setHorasPorAreaSubject(horasPorArea: DetallesAlumno) {
    this.horasPorAreaSubject.next(horasPorArea)
  }

  private actividadesSubject = new BehaviorSubject<Actividad[]>([])
  actividades$ = this.actividadesSubject.asObservable()
  setActvidades(nuevasActividades: Actividad[]) {
    this.actividadesSubject.next(nuevasActividades)
  }

  private actividadesParaFiltrarSubject = new BehaviorSubject<Actividad[]>([])
  actividadesParaFiltrar$ = this.actividadesParaFiltrarSubject.asObservable()
  setActividadesParaFiltrar(actividades: Actividad[]) {
    if (!actividades) {
      this.actividadesParaFiltrarSubject.next([])
      return
    }
    this.actividadesParaFiltrarSubject.next(actividades)
  }

  registrarActividad(actividad: any): Observable<any> {
    return this.http.post(`${this.url}/actividad/actividades`, actividad, { withCredentials: true })
  }

  traerTotalesAlumno(): Observable<any> {
    return this.http.get(`${this.url}/actividad/totales_alumno`, { withCredentials: true })
  }

  traerHorasFiltradas(mesYanio: string): Observable<any> {
    return this.http.get(`${this.url}/actividad/horas_mes/${mesYanio}`, { withCredentials: true })
  }

  traerActividadesFiltradas(mesYanio: string | undefined, area: string | undefined): Observable<any> {
    let params: any = {}
    if (mesYanio) {
      params.mesYanio = mesYanio
    }
    if (area) {
      params.area = area
    }
    return this.http.get(`${this.url}/actividad/actividades_filtradas`, { params, withCredentials: true })
  }

  validarActividad(actividadForm: FormGroup): boolean {

    //validar que no esten vacios
    if (actividadForm.get('fecha')?.hasError('required')) {
      alert('fecha requerida!')
      return false
    }
    if (actividadForm.get('horaInic')?.hasError('required')) {
      alert('hora de inicio requerida!')
      return false
    }
    if (actividadForm.get('horaTerm')?.hasError('required')) {
      alert('hora de termino requerida!')
      return false
    }
    if (actividadForm.get('area')?.hasError('required')) {
      alert('area requerida!')
      return false
    }

    //validar horas validas!
    const horaInic: string = actividadForm.get('horaInic')?.value
    const horaTerm: string = actividadForm.get('horaTerm')?.value

    //validar que la hora de inicio sea menor a la de termino
    const [hora1, minutos1] = horaInic.split(':').map(Number)
    const minutosInic: number = hora1 * 60 + minutos1

    const [hora2, minutos2] = horaTerm.split(':').map(Number)
    const minutosTerm: number = hora2 * 60 + minutos2

    if (minutosInic > minutosTerm) {
      alert('la hora de inicio no puede ser mayor a la de termino!')
      return false
    }

    //validar que las horas ingresadas esten dentro de 6 am y 11:30 pm
    const inicioPermitido = 6 * 60
    const finPermitido = 23 * 60 + 30
    if (minutosInic < inicioPermitido || minutosInic > finPermitido) {
      alert('hora de inicio fuera de rango permitido')
      return false
    }

    if (minutosTerm < inicioPermitido || minutosTerm > finPermitido) {
      alert('hora de termino no permitido!')
      return false
    }

    return true
  }







}
