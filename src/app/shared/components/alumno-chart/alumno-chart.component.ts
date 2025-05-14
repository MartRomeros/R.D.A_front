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
        name: 'Acceso',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Buscador' },
          { value: 735, name: 'Directo' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Ads Sociales' },
          { value: 300, name: 'Video Ads' }
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
