import { Component, inject, OnInit } from '@angular/core';
import { GeneralModule } from '../../../../../shared/modules/general/general.module';
import { MatSelectModule } from '@angular/material/select'
import { AuthServicesService } from '../../../../../services/auth-services.service';
import { UserService } from '../../../../../services/user.service';
import { ActividadService } from '../../../../../services/actividad.service';
import { lastValueFrom } from 'rxjs';
import { Actividad, User } from '../../../../../models/interfaces';

@Component({
  selector: 'app-tablero-historial',
  imports: [GeneralModule, MatSelectModule],
  templateUrl: './tablero-historial.component.html',
  styleUrl: './tablero-historial.component.css'
})
export class TableroHistorialComponent implements OnInit {
  //servicios
  private authService: AuthServicesService = inject(AuthServicesService)
  private userService: UserService = inject(UserService)
  private actividadService: ActividadService = inject(ActividadService)

  //variables privadas
  private user!: User

  //variables publicas
  actividades!: Actividad[]

  //ngoninit
  async ngOnInit() {
    await this.comprobarAutenticacion()
    await this.traerUsuario()
    await this.traerActividades(this.user.run)
    this.actividadService.actividades$.subscribe((actividad) => {
      this.actividades = actividad
    })

  }

  //metodos asyncronos
  private async comprobarAutenticacion() {
    try {
      await lastValueFrom(this.authService.isAuthenticated())
    } catch (error: any) {
      console.error(error)
      this.authService.goToLogin()
      alert('error al comprobar la autenticacion')
    }
  }

  private async traerUsuario() {
    try {
      const usuario: User = await lastValueFrom(this.userService.findUserbyEmail())
      this.user = usuario
    } catch (error: any) {
      console.error(error)
      this.authService.goToLogin()
    }
  }

  private async traerActividades(run: string) {
    try {
      const actividades = await lastValueFrom(this.actividadService.traerActividadesByAlumno(run))
      this.actividadService.setActvidades(actividades.actividades)
      //traer el correo del usuario
    } catch (error: any) {
      console.error(error)
      this.authService.goToLogin()
      alert('error al traer al usuario')
    }
  }

  private filtrarActividades(area: string) {
    let actividadesFiltradas: Actividad[] = []
    this.actividadService.actividades$.subscribe((actividad) => {
      this.actividades = actividad
      this.actividades.forEach((actividad) => {
        if (actividad.area_trabajo === area) {
          actividadesFiltradas.push(actividad)
        }
      })
    })
    return actividadesFiltradas
  }

  mostrarActividadesPorArea(area: string) {
    this.actividades = this.filtrarActividades(area)
  }

  mostrarTodasActividades() {
    this.actividadService.actividades$.subscribe((actividad) => {
      this.actividades = actividad
    })
  }  
}
