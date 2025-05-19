import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { ResumenComponent } from './resumen/resumen.component';
import { TablaHorasComponent } from './tabla-horas/tabla-horas.component';
import { ActividadFormComponent } from './actividad-form/actividad-form.component';
import { ChartComponent } from './chart/chart.component';

@Component({
  selector: 'app-alumno',
  imports: [HeaderComponent, ResumenComponent, TablaHorasComponent, ActividadFormComponent, ChartComponent],
  templateUrl: './alumno.component.html',
  styleUrl: './alumno.component.css'
})
export class AlumnoComponent {

}
