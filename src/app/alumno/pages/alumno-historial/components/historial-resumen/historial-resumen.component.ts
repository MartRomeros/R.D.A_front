import { Component, inject, OnInit } from '@angular/core';
import { GeneralModule } from '../../../../../shared/modules/general/general.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { AuthServicesService } from '../../../../../services/auth-services.service';
import { last, lastValueFrom } from 'rxjs';
import { UserService } from '../../../../../services/user.service';
import { Actividad, User } from '../../../../../models/interfaces';
import { ActividadService } from '../../../../../services/actividad.service';

@Component({
  selector: 'app-historial-resumen',
  imports: [GeneralModule, NgxEchartsModule],
  templateUrl: './historial-resumen.component.html',
  styleUrl: './historial-resumen.component.css'
})
export class HistorialResumenComponent implements OnInit {
  //servicios
  private authService: AuthServicesService = inject(AuthServicesService)
  private userService: UserService = inject(UserService)
  private actividadService: ActividadService = inject(ActividadService)

  //variables privadas
  private meses: string[] = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
  private mesActual: number = new Date().getMonth()

  //variables publicas
  mesesHastaAhora: string[] = this.meses.slice(0, this.mesActual + 1)

  // ejemplo.component.ts
  barChartOptions = {
    title: {
      text: 'Horas por actividad'
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['D', 'E', 'C', 'DL']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Horas',
        type: 'bar',
        data: [10, 7, 5, 8], // estos son tus valores
        itemStyle: {
          color: '#5C7BD9'
        }
      }
    ]
  };

  async ngOnInit() {
    await this.traerUsuario()
  }

  private async traerUsuario() {
    try {
      //comprobar autenticacion
      const response = await lastValueFrom(this.authService.isAuthenticated())
      if (!response.isAuthenticated) {
        alert('error al comprobar autenticacion')
        return
      }
      //traer al usuario
      const user: User = await lastValueFrom(this.userService.findUserbyEmail())
      if (!user) {
        alert('error al traer al usuario')
        return
      }

      //traer actividades
      const actividades:Actividad = await lastValueFrom(this.actividadService.traerActividadesByAlumno(user.run))
      if(!actividades){
        alert('error al traer actividades')
        return
      }




      //traer el correo del usuario
    } catch (error: any) {
      console.error(error)
      alert('error al traer al usuario')
    }
  }




}
