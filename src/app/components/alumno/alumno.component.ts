import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { AuthServicesService } from '../../services/auth-services.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { provideNativeDateAdapter } from '@angular/material/core'
import { Actividad, User } from '../../models/interfaces';
import { ActividadService } from '../../services/actividad.service';
import { GeneralModule } from '../../shared/modules/general/general.module';
import { AlumnoChartComponent } from '../../shared/components/alumno-chart/alumno-chart.component';

@Component({
  selector: 'app-alumno',
  imports: [FormsModule, HeaderComponent, ReactiveFormsModule, GeneralModule, AlumnoChartComponent],
  templateUrl: './alumno.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './alumno.component.css',
  standalone: true
})
export class AlumnoComponent implements OnInit {

  private router = new Router()
  private authService = inject(AuthServicesService)
  private userService = inject(UserService)
  private actividadService = inject(ActividadService)
  private fb = inject(FormBuilder)

  actividadForm: FormGroup = this.fb.group({
    fecha: [''],
    horaInic: [''],
    horaTerm: [''],
    area: ['']
  })
  actividades!: Actividad[]
  montoAcumulado: number = 0
  horasTrabajadas: number = 0
  montoAcumuladoFormateado: string = ''
  fechaPago: any
  diasRestantes: any


  ngOnInit(): void {
    this.traerHoras()
    this.traerFechaAproxPago()
  }



  isMobile(): boolean {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  async obtenerUsuario() {
    try {
      const response = await lastValueFrom(this.authService.isAuthenticated())
      const response2 = await lastValueFrom(this.userService.findUserbyEmail())
      console.log(response2)
      if (!response.isAuthenticated) {
        console.log('error en la autenticacion!')
        this.router.navigate(['/login'])
        return
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  async registrarHora() {
    //formateo de fechas
    const date = new Date(this.actividadForm.get('fecha')?.value)
    const dia = date.getDate().toString().padStart(2, '0')
    const mes = (date.getMonth() + 1).toString().padStart(2, '0')
    const anio = date.getFullYear().toString().slice(-2)
    const fechaFormateada = `${dia}/${mes}/${anio}`

    try {

      //traer al usuario por el email que esta en la cookie
      const usuario: User = await lastValueFrom(this.userService.findUserbyEmail())
      const run = usuario.run

      const valores: Actividad = {
        area_trabajo: this.actividadForm.get('area')?.value,
        fecha_actividad: fechaFormateada,
        hora_inic_activdad: this.actividadForm.get('horaInic')?.value,
        hora_term_actividad: this.actividadForm.get('horaTerm')?.value,
        run_alumno: run
      }

      const response = await lastValueFrom(this.actividadService.registrarActividad(valores))
      alert(response.message)

      const actividades = await lastValueFrom(this.actividadService.traerActividadesByAlumno(run))
      this.actividades = actividades.actividades

    } catch (error: any) {
      console.error(error)
    }
  }

  async traerHoras() {
    try {
      //traer al usuario por el email que esta en la cookie
      const usuario: User = await lastValueFrom(this.userService.findUserbyEmail())
      const run = usuario.run
      const actividades = await lastValueFrom(this.actividadService.traerActividadesByAlumno(run))
      this.actividades = actividades.actividades

      this.actividades.forEach((actividad) => {
        const [hInic, mInic] = actividad.hora_inic_activdad.split(':').map(Number)
        const [hTerm, mTerm] = actividad.hora_term_actividad.split(':').map(Number)
        const minutosInic = hInic * 60 + mInic
        const minutosTerm = hTerm * 60 + mTerm

        const diferenciaMinutos = Math.abs(minutosInic - minutosTerm)
        const diferenciaHoras = diferenciaMinutos / 60
        this.horasTrabajadas += diferenciaHoras

        const valorActividad = diferenciaHoras * 2450
        this.montoAcumulado += valorActividad
      })

      this.montoAcumuladoFormateado = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        maximumFractionDigits: 0
      }).format(this.montoAcumulado)


    } catch (error: any) {
      console.error(error)
    }
  }

  private traerFechaAproxPago() {
    const añoActual = new Date().getFullYear();
    const mes = new Date().getMonth()

    // Buscar entre el 8 y el 14 (segunda semana del mes)
    for (let dia = 15; dia <= 21; dia++) {
      const fecha = new Date(añoActual, mes, dia);
      if (fecha.getDay() === 5) { // 5 = viernes

        const diferenciaMs = fecha.getTime() - new Date().getTime();
        const diasRestantes = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));
        this.diasRestantes = diasRestantes

        const opciones = new Intl.DateTimeFormat('es-CL', {
          day: 'numeric',
          month: 'long'
        }).format(fecha)
        this.fechaPago = opciones
      }
    }
  }

  
}
