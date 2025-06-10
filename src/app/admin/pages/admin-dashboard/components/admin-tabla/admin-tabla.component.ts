import { Component, inject, OnInit } from '@angular/core';
import { GeneralModule } from '../../../../../shared/modules/general/general.module';
import { UserService } from '../../../../../services/user.service';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { ActividadService } from '../../../../../services/actividad.service';

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
  alumnos: any
  horasTotales: number = 0
  horasMes: number = 0
  run?:string
  nombre?:string
  email?:string
  fono?:number

  async ngOnInit() {
    await this.traerAlumnosAyudantes()
  }

  //traer alumnos ayudantes
  private async traerAlumnosAyudantes() {
    try {
      const response = await lastValueFrom(this.userService.traerAlumnos())
      console.log(response)
      this.alumnos = response.resultados
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
      this.horasTotales = detalles.horasTotales
      this.horasMes = detalles.horasTotalesMes

      console.log(detalles)
    } catch (error:any) {
      console.error(error)
    }
  }


}
