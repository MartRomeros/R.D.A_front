import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { GeneralModule } from '../../../shared/modules/general/general.module';
import { HistorialResumenComponent } from './components/historial-resumen/historial-resumen.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { TableroHistorialComponent } from "./components/tablero-historial/tablero-historial.component";

@Component({
  selector: 'app-alumno-historial',
  imports: [HeaderComponent, GeneralModule, HistorialResumenComponent, NgxEchartsModule, TableroHistorialComponent],
  templateUrl: './alumno-historial.component.html',
  styleUrl: './alumno-historial.component.css'
})
export class AlumnoHistorialComponent {

  //variables privadas
  private meses: string[] = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
  private mesActual: number = new Date().getMonth()

  //variables publicas
  mesesHastaAhora: string[] = this.meses.slice(0, this.mesActual + 1)
  //grafico
  barChartOptions = {
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

}
