import { Component, inject, OnInit } from '@angular/core';
import { GeneralModule } from '../../../../../shared/modules/general/general.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { ActividadService } from '../../../../../services/alumno/actividad.service';
import { Actividad, AreaTrabajo, DetallesAlumno } from '../../../../../models/interfaces';
import { lastValueFrom } from 'rxjs';
import { AreaTrabajoService } from '../../../../../services/area-trabajo.service';
import { AlumnoService } from '../../../../../services/alumno/alumno.service';
import { Area_Trabajo, HorasAreasMes } from '../../models/interfaces';

@Component({
  selector: 'app-chart',
  imports: [GeneralModule, NgxEchartsModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements OnInit {

  //servicios
  private alumnoService = inject(AlumnoService)
  //variables privadas
  private horasAreaMes!: HorasAreasMes
  private areasTrabajo!: Area_Trabajo[]

  chartOptions: any = {
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
        data: [],
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
    await this.traerAreas()
    await this.traerHorasArea()
    this.alumnoService.horasAreaMes$.subscribe((horasAreas) => {
      this.horasAreaMes = horasAreas
      this.actualizarGrafico()
    })
    this.actualizarGrafico()
    // Si no hay actividades en cache, las trae desde el backend


  }

  //metodos
  private async traerAreas() {
    try {
      const response = await lastValueFrom(this.alumnoService.traerAreas())
      const areasTrabajo: AreaTrabajo[] = response.areasTrabajo
      this.areasTrabajo = areasTrabajo

    } catch (error) {
      console.error(error)
    }
  }

  private async traerHorasArea() {
    try {
      const response: HorasAreasMes = await lastValueFrom(this.alumnoService.traerHorasAreasMes())
      this.alumnoService.setHorasAreaMes(response)
      this.horasAreaMes = response
    } catch (error) {
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
            { value: this.horasAreaMes.difusion, name: this.areasTrabajo[0].nombre },
            { value: this.horasAreaMes.extension, name: this.areasTrabajo[1].nombre },
            { value: this.horasAreaMes.comunicacion, name: this.areasTrabajo[2].nombre },
            { value: this.horasAreaMes.desarrollo_laboral, name: this.areasTrabajo[3].nombre }
          ]
        }
      ]
    };
  }

}
