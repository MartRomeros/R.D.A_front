import { Component, inject, OnInit } from '@angular/core';
import { GeneralModule } from '../../../../../shared/modules/general/general.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { ActividadService } from '../../../../../services/actividad.service';
import { Actividad, DetallesAlumno } from '../../../../../models/interfaces';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-chart',
  imports: [GeneralModule, NgxEchartsModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements OnInit {

  //servicios
  private actividadService = inject(ActividadService)
  //variables privadas
  private difusion: number = 0
  private extension: number = 0
  private comunicacion: number = 0
  private desarrolloLaboral: number = 0
  private actividades!: Actividad[]

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

    await this.traerHoras()
    this.actividadService.horasPorArea$.subscribe((detallesAlumno:DetallesAlumno) => {
      this.difusion = detallesAlumno.horasArea!.difusion
      this.comunicacion = detallesAlumno.horasArea!.comunicacion
      this.extension = detallesAlumno.horasArea!.extension
      this.desarrolloLaboral = detallesAlumno.horasArea!.desarrolloLaboral
      this.actualizarGrafico()
    })

    // Si no hay actividades en cache, las trae desde el backend
    

  }

  //metodos
  private async traerHoras() {
    try {
      const response: DetallesAlumno = await lastValueFrom(this.actividadService.traerDetallesDelAlumno())
      this.actividadService.setHorasPorAreaSubject(response)
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
            { value: this.difusion, name: 'Difusión' },
            { value: this.extension, name: 'Extensión' },
            { value: this.comunicacion, name: 'Comunicación' },
            { value: this.desarrolloLaboral, name: 'Desarrollo laboral' }
          ]
        }
      ]
    };
  }

}
