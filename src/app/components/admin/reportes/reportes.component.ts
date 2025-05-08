import { Component } from '@angular/core';
import { ReportesFiltosComponent } from './reportes-filtos/reportes-filtos.component';
import { ReportesTablasComponent } from './reportes-tablas/reportes-tablas.component';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-reportes',
  imports: [ReportesFiltosComponent, ReportesTablasComponent,],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css',
})
export class ReportesComponent {
  // Metadata (esto se gestionaría generalmente a través de Title/Meta services en Angular)
  metadata = {
    title: "Reportes - DUOC UC",
    description: "Gestión de reportes de alumnos ayudantes de DUOC UC"
}
constructor(private titleService: Title, private metaService: Meta) {
    this.titleService.setTitle(this.metadata.title);
    this.metaService.updateTag({ name: 'description', content: this.metadata.description });
  }
}