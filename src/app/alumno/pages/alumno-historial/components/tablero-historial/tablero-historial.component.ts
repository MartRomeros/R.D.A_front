import { Component } from '@angular/core';
import { GeneralModule } from '../../../../../shared/modules/general/general.module';
import { MatSelectModule } from '@angular/material/select'

@Component({
  selector: 'app-tablero-historial',
  imports: [GeneralModule, MatSelectModule],
  templateUrl: './tablero-historial.component.html',
  styleUrl: './tablero-historial.component.css'
})
export class TableroHistorialComponent {

  //variables privadas
  private meses: string[] = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
  private mesActual: number = new Date().getMonth()

  //variables publicas
  mesesHastaAhora: string[] = this.meses.slice(0, this.mesActual + 1)




}
