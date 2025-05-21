import { Component } from '@angular/core';
import { GeneralModule } from '../../../../../shared/modules/general/general.module';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-historial-resumen',
  imports: [GeneralModule,NgxEchartsModule],
  templateUrl: './historial-resumen.component.html',
  styleUrl: './historial-resumen.component.css'
})
export class HistorialResumenComponent {

  // ejemplo.component.ts
  barChartOptions = {
    title: {
      text: 'Horas por actividad'
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['Difusión', 'Extensión', 'Comunicación', 'Desarrollo laboral']
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

}
