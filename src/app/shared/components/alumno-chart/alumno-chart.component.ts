import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts'

@Component({
  selector: 'app-alumno-chart',
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './alumno-chart.component.html',
  styleUrl: './alumno-chart.component.css'
})
export class AlumnoChartComponent {

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
          { value: 1048, name: 'Difusion' },
          { value: 735, name: 'Extension' },
          { value: 580, name: 'Comunicacion' },
          { value: 484, name: 'Desarrollo laboral' }
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


}
