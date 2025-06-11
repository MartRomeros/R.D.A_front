import { Component, inject, OnInit } from '@angular/core';
import { GeneralModule } from '../../../../../shared/modules/general/general.module';
import { ActividadService } from '../../../../../services/actividad.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-admin-resumen',
  imports: [GeneralModule],
  templateUrl: './admin-resumen.component.html',
  styleUrl: './admin-resumen.component.css'
})
export class AdminResumenComponent implements OnInit {

  //servicios
  private actividadService: ActividadService = inject(ActividadService)

  //variables publicas
  horasMes?:number
  alumnos?:number
  promedio?:number


  async ngOnInit() {
    await this.traerTotales()
  }

  async traerTotales() {

    try {
      const response = await lastValueFrom(this.actividadService.traerTotales())
      this.horasMes = response.horasMes
      this.alumnos = response.alumnos
      const promedio = Math.round(this.horasMes!/this.alumnos!)
      this.promedio = promedio
    } catch (error: any) {
      console.error(error)
    }

  }


}
