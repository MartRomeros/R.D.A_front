import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { GeneralModule } from '../../../shared/modules/general/general.module';
import { HistorialResumenComponent } from './components/historial-resumen/historial-resumen.component';
import { TableroHistorialComponent } from './components/tablero-historial/tablero-historial.component';

@Component({
  selector: 'app-alumno-historial',
  imports: [HeaderComponent, GeneralModule, HistorialResumenComponent, TableroHistorialComponent],
  templateUrl: './alumno-historial.component.html',
  styleUrl: './alumno-historial.component.css'
})
export class AlumnoHistorialComponent {

}
