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
  horaAreaMes!:number
  horasResumenMes!: number
  alumnosResumen!: number
  area!:string



  horasTotales: number = 0
  horasMes: number = 0
  run?: string
  nombre?: string
  email?: string
  fono?: number
  actividades!: Actividad[]
  alumnosAyudantes!:Alumno[]

  async ngOnInit() {
    await this.traerAreaAdministrador()
    await this.traerAlumnosAyudantes()
    await this.traerTotales()
  }

  //traer alumnos ayudantes
  private async traerAlumnosAyudantes() {
    try {
      const response = await lastValueFrom(this.adminService.traerAlumnos())
      const alumnos: Alumno[] = response.alumnos
      this.alumnosAyudantes = alumnos

    } catch (error: any) {
      console.log(error)

    }
  }

  private async traerAreaAdministrador(){
    try {
      const response = await lastValueFrom(this.adminService.traerAdmin())
      const admin:Administrador = response.administrador
      this.area = admin.area_trabajo.nombre
      console.log(this.area)
    } catch (error) {
      console.error(error)
    }
  }

  async mostrarDetalles(run: string) {
    try {
      const detalles = await lastValueFrom(this.adminService.traerDetalleAlumno(run))
      const datos:Detalles = detalles.detalles

      this.nombre = `${datos.nombre} ${datos.apellido_paterno} ${datos.apellido_materno}`
      this.run = datos.run
      this.email = datos.email
      this.fono = datos.fono
      this.horasTotales = datos.horasTotales
      this.horasMes = datos.horasTotalesMes
      this.actividades = datos.actividadesMes
      console.log(this.actividades)

    } catch (error: any) {
      console.error(error)
    }
  }

  async traerTotales() {

    try {
      const response:TotalesMes = await lastValueFrom(this.adminService.traerResumenMes())
      this.horaAreaMes = response.totalesArea
      this.horasResumenMes = response.totales
      this.alumnosResumen = response.alumnosAyudantes
      
    } catch (error: any) {
      console.error(error)
    }

  }


}
