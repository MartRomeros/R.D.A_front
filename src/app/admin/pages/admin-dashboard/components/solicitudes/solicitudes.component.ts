import { Component, inject, OnInit } from '@angular/core';
import { GeneralModule } from '../../../../../shared/modules/general/general.module';
import { SolicitudService } from '../../../../../services/solicitud.service';
import { last, lastValueFrom } from 'rxjs';
import { ActividadService } from '../../../../../services/actividad.service';
import { Solicitud } from '../../../../../models/interfaces';
import Swal from 'sweetalert2';

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
    this.solicitudService.solicitud$.subscribe((solicitudes) => {
      this.solicitudes = solicitudes
    })

  }

  async traerSolicitudes() {
    try {
      const response = await lastValueFrom(this.solicitudService.traerSolicitudes())
      const solicitudes: Solicitud[] = response.solicitudes
      this.solicitudService.setSolicitud(solicitudes)

    } catch (error: any) {
      console.error(error)
    }
  }

  async confirmarActualizacion(id: number) {
    
    const result = await Swal.fire({
      title: "¿Quieres aprobar esta actividad?",
      html: `
      <h6> Alumno Ayudante:</h6>
      <h6> Fecha de actividad:</h6>
      <h6> Hora de inicio:</h6>
      <h6> Hora de termino:</h6>
      <h6>Cantidad de horas: </h6>
      <h6>Area de trabajo: </h6>
      `,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Aprobar",
      denyButtonText: `No aprobar`
    });

    if (result.isConfirmed) {
      try {
        await this.actualizarSolicitud(id);  // Suponiendo que puede ser async
        Swal.fire("Actividad aprobada", "", "success");
      } catch (error: any) {
        Swal.fire("Error", error || "", "error");
      }
    } else if (result.isDenied) {
      Swal.fire("Cambios no guardados", "", "info");
    }

  }

  private async actualizarSolicitud(id: number) {
    try {
      await lastValueFrom(this.solicitudService.aprobarSolicitud(id))
      const response2 = await lastValueFrom(this.solicitudService.traerSolicitudes())
      const solicitudes: Solicitud[] = response2.solicitudes
      this.solicitudService.setSolicitud(solicitudes)
    } catch (error: any) {
      console.error(error)

    }

  }



}
