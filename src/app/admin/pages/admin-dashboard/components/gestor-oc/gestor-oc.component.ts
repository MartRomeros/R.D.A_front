import { Component, inject } from '@angular/core';
import { GeneralModule } from '../../../../../shared/modules/general/general.module';
import { ReportesServicesService } from '../../../../../services/reportes-services.service';
import { ModeloOc } from '../../models/interfaces';

@Component({
  selector: 'app-gestor-oc',
  imports: [GeneralModule],
  templateUrl: './gestor-oc.component.html',
  styleUrl: './gestor-oc.component.css'
})
export class GestorOcComponent {

  file: File | null = null
  reporteService = inject(ReportesServicesService)
  reporteOC!: ModeloOc[]

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
    }
  }

  mandarExcel() {
    const data = new FormData()
    if (!this.file) return
    data.append('file', this.file)

    this.reporteService.mostrarOrdenesCompras(data).subscribe({
      next: (res: any) => this.reporteOC = res.datos_filtrados,
      error: (err: any) => console.log('error al mandar el archivo', err)
    })

  }

}
