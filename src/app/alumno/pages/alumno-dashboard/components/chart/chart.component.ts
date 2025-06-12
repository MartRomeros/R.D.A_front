import { Component, inject, OnInit } from '@angular/core';
import { GeneralModule } from '../../../../../shared/modules/general/general.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { ActividadService } from '../../../../../services/alumno/actividad.service';
import { Actividad, AreaTrabajo, DetallesAlumno } from '../../../../../models/interfaces';
import { lastValueFrom } from 'rxjs';
import { AreaTrabajoService } from '../../../../../services/area-trabajo.service';

@Component({
  selector: 'app-chart',
  imports: [GeneralModule, NgxEchartsModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements OnInit {

  //servicios
  private actividadService = inject(ActividadService)
  private areaTrabajoService = inject(AreaTrabajoService)
  //variables privadas
  private difusion: number = 0
  private extension: number = 0
  private comunicacion: number = 0
  private desarrolloLaboral: number = 0
  private areasTrabajo!: AreaTrabajo[]

  chartOptions = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Areas de trabajo',
        type: 'pie',
        radius: '50%',
        data: [
          { value: this.difusion, name: 'Difusion' },
          { value: this.extension, name: 'Extension' },
          { value: this.comunicacion, name: 'Comunicacion' },
          { value: this.desarrolloLaboral, name: 'Desarrollo laboral' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  //ngOnInit (al iniciar la pagina)
  async ngOnInit() {

    await this.traerAreaTrabajo()
    this.areaTrabajoService.areasTrabajo$.subscribe((areasTrabajo)=>{
      this.areasTrabajo = areasTrabajo
    })
    await this.traerHoras()
    this.actividadService.detallesAlumno$.subscribe((detallesAlumno: DetallesAlumno) => {
      this.difusion = detallesAlumno.horasAreaMes!.difusion;
      this.comunicacion = detallesAlumno.horasAreaMes!.comunicacion
      this.extension = detallesAlumno.horasAreaMes!.extension
      this.desarrolloLaboral = detallesAlumno.horasAreaMes!.desarrolloLaboral
      this.actualizarGrafico()
    })

    // Si no hay actividades en cache, las trae desde el backend


  }

  //metodos
  private async traerHoras() {
    try {
      const response: DetallesAlumno = await lastValueFrom(this.actividadService.traerDetallesDelAlumno())
      console.log(response)
      this.actividadService.setDetallesAlumnoSubject(response)
    } catch (error: any) {
      console.error(error)
    }
  }

  private async traerAreaTrabajo() {
    try {
      const response = await lastValueFrom(this.areaTrabajoService.traerAreasTrabajo())
      this.areaTrabajoService.setareasTrabajo(response.areas)
    } catch (error: any) {
      console.error(error)
    }

  }

  private actualizarGrafico() {
    this.chartOptions = {
      ...this.chartOptions, // mantiene tooltip y leyenda
      series: [
        {
          ...this.chartOptions.series[0], // copia estilos existentes
          data: [
            { value: this.difusion, name: this.areasTrabajo[0].nombre },
            { value: this.extension, name: this.areasTrabajo[1].nombre },
            { value: this.comunicacion, name: this.areasTrabajo[2].nombre },
            { value: this.desarrolloLaboral, name: this.areasTrabajo[3].nombre }
          ]
        }
      ]
    };
  }

}
