import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-reportes-filtos',
  imports: [FormsModule],
  templateUrl: './reportes-filtos.component.html',
  styleUrl: './reportes-filtos.component.css'
})
export class ReportesFiltosComponent {
  searchQuery: string = '';
  estadoSeleccionado: string = 'todos';

  onSearchChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value;
  }

  onEstadoChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.estadoSeleccionado = selectElement.value;
  }
}
