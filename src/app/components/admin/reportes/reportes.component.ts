import { Component } from '@angular/core';
import { ReportesTablasComponent } from './reportes-tablas/reportes-tablas.component';
import { Title, Meta } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-reportes',
  imports: [ ReportesTablasComponent, MatCardModule ],
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