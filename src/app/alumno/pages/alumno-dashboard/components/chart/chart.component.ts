import { Component, inject, OnInit } from '@angular/core';
import { GeneralModule } from '../../../../../shared/modules/general/general.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { ActividadService } from '../../../../../services/actividad.service';
import { UserService } from '../../../../../services/user.service';
import { Actividad, User } from '../../../../../models/interfaces';
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
  private usuarioService = inject(UserService)
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

    this.actividadService.actividades$.subscribe((actividades) => {
      this.filtrarActividadesPorSeccion(actividades)
      this.actualizarGrafico()
    })
    await this.traerHoras()

    // Si no hay actividades en cache, las trae desde el backend
    if (this.actividadService.getActividades().length === 0) {
      await this.traerHoras();
    }

  }

  //metodos
  private async traerHoras() {
    try {
      //obtener usuario por el email
      const usuario: User = await lastValueFrom(this.usuarioService.findUserbyEmail())
      //obtener run del usuario
      const run: string = usuario.run
      //obtener actividades por run
      const actividadesResponse = await lastValueFrom(this.actividadService.traerActividadesByAlumno(run))
      //actualizar variable actividad de actividad service

      this.actividadService.setActvidades(actividadesResponse.actividades)
    } catch (error: any) {
      alert('error al cargar en chart-alumno')
    }
  }



  private filtrarActividadesPorSeccion(actividades: Actividad[]) {
    // Reiniciar contadores
    this.difusion = 0;
    this.extension = 0;
    this.comunicacion = 0;
    this.desarrolloLaboral = 0;

    // Contar por tipo de área
    actividades.forEach((actividad) => {
      switch (actividad.area_trabajo.toLowerCase()) {
        case 'difusion':
          const [horaInic, minInic] = actividad.hora_inic_activdad.split(':').map(Number)
          const [horaTerm, minTerm] = actividad.hora_term_actividad.split(':').map(Number)
          const diferenciaMinutos = Math.abs((horaTerm * 60 + minTerm) - (horaInic * 60 + minInic))
          const diferenciaHoras = diferenciaMinutos / 60
          this.difusion =+ diferenciaHoras
          break;
        case 'extension':          
          break;
        case 'desarrollo_laboral':
          this.desarrolloLaboral++;
          break;
        case 'comunicacion':
          this.comunicacion++;
          break;
      }
    });
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
