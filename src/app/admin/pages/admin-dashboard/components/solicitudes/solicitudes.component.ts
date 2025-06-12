import { Component, inject, OnInit } from '@angular/core';
import { GeneralModule } from '../../../../../shared/modules/general/general.module';
import { lastValueFrom } from 'rxjs';
import { ActividadService } from '../../../../../services/actividad.service';
import { Solicitud } from '../../../../../models/interfaces';
import Swal from 'sweetalert2';
import { SolicitudService } from '../../../../../services/admin/solicitud.service';

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
  nombreApellido?:string
  fechaActividad?:string
  horaInicio:any
  horaTermino:any
  cantidadHoras:any
  areaTrabajo:any

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
      console.log(solicitudes)
      this.solicitudService.setSolicitud(solicitudes)
    } catch (error: any) {
      console.error(error)
    }
  }

  async confirmarActualizacion(id: number) {
    let response
    try {
      response = await lastValueFrom(this.solicitudService.traerSolicitudId(id))
      this.nombreApellido = `${response.solicitud.alumno.nombre} ${response.solicitud.alumno.apellido_paterno}`
      const solicitudFormateada =  this.solicitudService.formatearFecha(response.solicitud)
      this.fechaActividad = solicitudFormateada.actividad.fecha_actividad
      this.horaInicio = solicitudFormateada.actividad.hora_inic_activdad
      this.horaTermino = solicitudFormateada.actividad.hora_term_actividad
      this.areaTrabajo = response.solicitud.actividad.area_trabajo.nombre
    } catch (error:any) {
      console.error(error)
    }
    
    const result = await Swal.fire({
      title: "¿Quieres aprobar esta actividad?",
      html: `
      <h6> Alumno Ayudante: ${this.nombreApellido}</h6>
      <h6> Fecha de actividad: ${this.fechaActividad}</h6>
      <h6> Hora de inicio: ${this.horaInicio}</h6>
      <h6> Hora de termino: ${this.horaTermino}</h6>
      <h6>Area de trabajo: ${this.areaTrabajo}</h6>
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
