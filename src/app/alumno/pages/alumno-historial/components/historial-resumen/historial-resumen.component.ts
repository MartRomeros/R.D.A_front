import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { GeneralModule } from '../../../../../shared/modules/general/general.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { lastValueFrom } from 'rxjs';
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
  private actividadService: ActividadService = inject(ActividadService)

  //variables privadas
  private meses: string[] = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
  private mesActual: number = new Date().getMonth()


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

  async ngOnInit() {
    await this.detallesInicialesAlumno()
    this.actividadService.actividades$.subscribe((actividades) => {
      this.actividades = actividades
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

  async detallesInicialesAlumno() {
    try {
      const responseHoras = await lastValueFrom(this.actividadService.traerTotalesAlumno())
      this.horasDesarrolloLaboral = responseHoras.horasArea.desarrolloLaboral
      this.horasComunicacion = responseHoras.horasArea.comunicacion
      this.horasDifusion = responseHoras.horasArea.difusion
      this.horasExtension = responseHoras.horasArea.extension

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

    } catch (error: any) {
      console.error(error)
    }
  }

  async filtrarHorasMes(mes:number){
    const now = new Date()
    const year = now.getFullYear();
    const mesFiltro = mes + 1
    try {
      const responseHoras = await lastValueFrom(this.actividadService.traerHorasFiltradas(`0${mesFiltro}${year}`))
      this.horasDesarrolloLaboral = responseHoras.horasArea.desarrolloLaboral
      this.horasComunicacion = responseHoras.horasArea.comunicacion
      this.horasDifusion = responseHoras.horasArea.difusion
      this.horasExtension = responseHoras.horasArea.extension

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

    } catch (error:any) {
      console.error(error)
      
    }

  }

}
