import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { GeneralModule } from '../../../../../shared/modules/general/general.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { AuthServicesService } from '../../../../../services/auth-services.service';
import { lastValueFrom } from 'rxjs';
import { UserService } from '../../../../../services/user.service';
import { Actividad, User } from '../../../../../models/interfaces';
import { ActividadService } from '../../../../../services/actividad.service';


@Component({
  selector: 'app-historial-resumen',
  imports: [GeneralModule, NgxEchartsModule],
  templateUrl: './historial-resumen.component.html',
  styleUrl: './historial-resumen.component.css'
})
export class HistorialResumenComponent implements OnInit, OnDestroy {
  //servicios
  private authService: AuthServicesService = inject(AuthServicesService)
  private userService: UserService = inject(UserService)
  private actividadService: ActividadService = inject(ActividadService)

  //variables privadas
  private meses: string[] = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
  private mesActual: number = new Date().getMonth()
  private user!: User


  //variables publicas
  mesesHastaAhora: string[] = this.meses.slice(0, this.mesActual + 1)
  actividades!: Actividad[]
  horasDifusion: number = 0
  horasExtension!: number
  horasDesarrolloLaboral!: number
  horasComunicacion!: number

  // grafico de barras
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
        data: [
          this.horasDifusion,
          this.horasExtension,
          this.horasComunicacion,
          this.horasDesarrolloLaboral
        ],
        itemStyle: {
          color: function (params: any) {
            const colors = ['#5C7BD9', '#57D9A3', '#F5A623', '#D9555C'];
            return colors[params.dataIndex];
          }
        }
      }
    ]
  };

  ngOnDestroy() {
    this.actividadService.setFiltroArea('todos')
    this.actividadService.setFiltroMes(null)
    this.actividadService.setActvidades(this.actividadService.getActividades())
  }

  async ngOnInit() {
    await this.comprobarAutenticacion()
    await this.traerUsuario()
    await this.traerActividades(this.user.run)
    this.actividadService.actividades$.subscribe((actividades) => {
      this.actividades = actividades
      this.horasDifusion = this.filtrarHoras('difusion')
      this.horasComunicacion = this.filtrarHoras('comunicacion')
      this.horasExtension = this.filtrarHoras('extension')
      this.horasDesarrolloLaboral = this.filtrarHoras('desarrollo_laboral')
      this.barChartOptions = {
        ...this.barChartOptions,
        series: [
          {
            ...this.barChartOptions.series[0],
            data: [
              this.horasDifusion,
              this.horasExtension,
              this.horasComunicacion,
              this.horasDesarrolloLaboral
            ]
          }
        ]
      }

    })

  }

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
      this.actividadService.setActvidades(actividades.actividades, true)
      //traer el correo del usuario
    } catch (error: any) {
      console.error(error)
      this.authService.goToLogin()
      alert('error al traer al usuario')
    }
  }

  private filtrarHoras(area: string): number {
    let horasTrabajadas = 0
    this.actividades.forEach((actividad) => {
      if (actividad.area_trabajo == area) {
        const [hInic, mInic] = actividad.hora_inic_activdad.split(':').map(Number);
        const [hTerm, mTerm] = actividad.hora_term_actividad.split(':').map(Number);
        const diferenciaMinutos = Math.abs((hTerm * 60 + mTerm) - (hInic * 60 + mInic));
        const diferenciaHoras = diferenciaMinutos / 60;
        horasTrabajadas += diferenciaHoras;
      }
    })
    return horasTrabajadas
  }

  mostrarActividadesPorMes(mes: number) {
    this.actividadService.setFiltroArea('todos')
    this.actividadService.setFiltroMes(mes)
    this.actividadService.aplicarFiltros()
  }

  mostrarTodasActividades() {
    this.actividadService.setFiltroArea('todos')
    this.actividadService.setFiltroMes(null)
    this.actividadService.aplicarFiltros()
  }

}
