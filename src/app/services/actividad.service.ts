import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Actividad } from '../models/interfaces';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  private http = inject(HttpClient)
  private localUrl = 'http://localhost:3000'//pruebas locales
  private rendelUrl = 'https://r-d-a-server-1.onrender.com' //pruebas

  private actividadesOriginales:Actividad[] = []

  private actividadesSubject = new BehaviorSubject<Actividad[]>([])
  actividades$ = this.actividadesSubject.asObservable()

  private filtroAreaSubject = new BehaviorSubject<string>('todos')
  filtroArea$ = this.filtroAreaSubject.asObservable()

  private filtroMesSubject = new BehaviorSubject<number | null>(null)
  filtroMes$ = this.filtroMesSubject.asObservable()

  setFiltroArea(area: string) {
    this.filtroAreaSubject.next(area)
  }

  setFiltroMes(mes: number | null) {
    this.filtroMesSubject.next(mes)
  }

  aplicarFiltros() {
    const actividades = this.actividadesOriginales
    const area = this.filtroAreaSubject.getValue()
    const mes = this.filtroMesSubject.getValue()

    const filtradas = actividades.filter((actividad) => {

      const cumpleArea = area === 'todos' || actividad.area_trabajo === area

      const cumpleMes = (() => {
        if (mes === null) return true
        const partesFecha = actividad.fecha_actividad.split('/')
        const mesActividad = parseInt(partesFecha[1]) - 1
        return mesActividad === mes
      })()

      return cumpleArea && cumpleMes
    })
    this.setActvidades(filtradas)
  }

  setActvidades(nuevasActividades: Actividad[],guardarOriginal:boolean = false) {
    if(guardarOriginal)[
      this.actividadesOriginales = [...nuevasActividades]
    ]
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
