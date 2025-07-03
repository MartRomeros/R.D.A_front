import { Component, inject, OnInit } from '@angular/core';
import { GeneralModule } from '../../../../../shared/modules/general/general.module';
import { lastValueFrom } from 'rxjs';
import { AdminService } from '../../../../../services/admin/admin.service';
import { Actividad, Administrador, Alumno, Detalles, TotalesMes } from '../../models/interfaces';

@Component({
  selector: 'app-admin-tabla',
  imports: [GeneralModule],
  templateUrl: './admin-tabla.component.html',
  styleUrl: './admin-tabla.component.css'
})
export class AdminTablaComponent implements OnInit {
  //servicios
  private adminService: AdminService = inject(AdminService)

  //variables publicas
  horaAreaMes!: number
  horasResumenMes!: number
  alumnos!: number

  area!: string
  horasTotales: number = 0
  horasMes: number = 0
  run?: string
  nombre?: string
  email?: string
  fono?: number
  actividades: any
  alumnosAyudantes: any

  async ngOnInit() {
    await this.traerResumenMes()
    await this.traerAlumnosAyudantes()
  }

  //traer alumnos ayudantes
  private async traerAlumnosAyudantes() {
    try {
      const response = await lastValueFrom(this.adminService.traerAlumnos())
      console.log(response)
      this.alumnosAyudantes = response.alumnos

    } catch (error: any) {
      console.log(error)

    }
  }

  private async traerResumenMes() {
    try {
      const response = await lastValueFrom(this.adminService.traerResumenMes())
      console.log(response)
      this.alumnos = response.resumen.alumnos
      this.horasResumenMes = response.resumen.actividades
      this.horaAreaMes = response.resumen.actividades_area
      this.area = response.resumen.area

    } catch (error) {
      console.error(error)
    }
  }

  async mostrarDetalles(run: string) {
    try {
      const response = await lastValueFrom(this.adminService.traerDetalleAlumno(run))
      console.log(response)
      this.nombre = response.infoAlumno.alumno.nombre
      this.run = response.infoAlumno.alumno.run
      this.email = response.infoAlumno.alumno.email
      this.fono = response.infoAlumno.alumno.fono
      this.horasTotales = response.infoAlumno.actividades_mes
      this.horasMes = response.infoAlumno.actividades_area

      const response2 = await lastValueFrom(this.adminService.traerActividadesAlumno(run))
      console.log(response2)
      this.actividades = response2.actividades


    } catch (error: any) {
      console.error(error)
    }
  }



}
