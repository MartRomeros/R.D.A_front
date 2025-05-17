import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ReportesTablasComponent } from './reportes/reportes-tablas/reportes-tablas.component';
import { MatCardModule } from '@angular/material/card';
import { ReportesServicesService } from '../../services/reportes-services.service';


@Component({
  selector: 'app-admin',
  imports: [HeaderComponent, ReportesTablasComponent, MatCardModule, ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  totalAlumnosAyudantes = 0;
  totalHoras = 0;
  totalAsignaturas = 0;

  constructor(private ReportesServicesService: ReportesServicesService) {}

  ngOnInit() {
    this.ReportesServicesService.alumnos$.subscribe(alumnos => {
      // Esta es la cantidad total de alumnos registradops como ayudantes
      this.totalAlumnosAyudantes = alumnos.length;
      //Calcular el total de horas
      // Suponiendo que cada alumno tiene una propiedad 'horas' que contiene el número de horas
      this.totalHoras = alumnos.reduce((acc, curr) => acc + (curr.horas || 0), 0)
      // Calcular asignaturas únicas
      const asignaturas = alumnos.map(a => a.asignatura);
      this.totalAsignaturas = new Set(asignaturas).size;
    });
  }
}


