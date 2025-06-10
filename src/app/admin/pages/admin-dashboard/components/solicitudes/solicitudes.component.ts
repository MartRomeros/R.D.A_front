import { Component, inject, OnInit } from '@angular/core';
import { GeneralModule } from '../../../../../shared/modules/general/general.module';
import { SolicitudService } from '../../../../../services/solicitud.service';
import { lastValueFrom } from 'rxjs';
import { ActividadService } from '../../../../../services/actividad.service';
import { Solicitud } from '../../../../../models/interfaces';

@Component({
  selector: 'app-solicitudes',
  imports: [GeneralModule],
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.css'
})
export class SolicitudesComponent implements OnInit {
  // servicios
  private solicitudService = inject(SolicitudService)
  private actividadService = inject(ActividadService)

  solicitudes?: Solicitud[]

  async ngOnInit() {
    await this.traerSolicitudes()

  }

  async traerSolicitudes() {
    try {
      const response = await lastValueFrom(this.solicitudService.traerSolicitudes())
      const solicitudes: Solicitud[] = response.solicitudes
      this.solicitudes = solicitudes
      solicitudes.forEach((solicitud) => {
        solicitud.actividad = this.actividadService.formatearActividad(solicitud.actividad)
      })
      this.solicitudes = solicitudes
    } catch (error: any) {
      console.error(error)
    }

  }



}
