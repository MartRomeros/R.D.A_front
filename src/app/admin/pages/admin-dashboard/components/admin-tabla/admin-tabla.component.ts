import { Component, inject, OnInit } from '@angular/core';
import { GeneralModule } from '../../../../../shared/modules/general/general.module';
import { UserService } from '../../../../../services/user.service';
import { lastValueFrom } from 'rxjs';
import { ActividadService } from '../../../../../services/actividad.service';
import { Actividad } from '../../../../../models/interfaces';

@Component({
  selector: 'app-admin-tabla',
  imports: [GeneralModule],
  templateUrl: './admin-tabla.component.html',
  styleUrl: './admin-tabla.component.css'
})
export class AdminTablaComponent implements OnInit {
  //servicios
  private userService: UserService = inject(UserService)
  private actividadService = inject(ActividadService)

  //variables publicas
  horasResumenMes?:number
  alumnosResumen?:number
  promedio?:number


  alumnos: any
  horasTotales: number = 0
  horasMes: number = 0
  run?:string
  nombre?:string
  email?:string
  fono?:number
  actividades!:Actividad[]

  async ngOnInit() {
    await this.traerAlumnosAyudantes()
    await this.traerTotales()
  }

  //traer alumnos ayudantes
  private async traerAlumnosAyudantes() {
    try {
      const response = await lastValueFrom(this.userService.traerAlumnos())
      this.alumnos = response.resultados
      console.log(this.alumnos)
    } catch (error: any) {
      console.log(error)

    }
  }

  async mostrarDetalles(run:string) {
    try {
      const detalles = await lastValueFrom(this.actividadService.traerDetallesRun(run))
      this.run = detalles.alumno.run
      this.email = detalles.alumno.email
      this.fono = detalles.alumno.fono
      this.nombre = `${detalles.alumno.nombre} ${detalles.alumno.apellido_paterno} ${detalles.alumno.apellido_materno}`
      console.log(detalles.alumno.apellido_materno)
      this.horasTotales = detalles.horasTotales
      this.horasMes = detalles.horasTotalesMes
      this.actividades = this.actividadService.formatearActividades(detalles.actividadesMes)
    } catch (error:any) {
      console.error(error)
    }
  }

  async traerTotales() {

    try {
      const response = await lastValueFrom(this.actividadService.traerTotales())
      console.log(response)
      this.horasResumenMes = response.horasMes
      this.alumnosResumen = response.alumnos
      const promedio = Math.round(this.horasMes!/this.alumnos!)
      this.promedio = promedio
    } catch (error: any) {
      console.error(error)
    }

  }


}
