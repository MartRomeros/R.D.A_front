import { Component, inject, OnInit } from '@angular/core';
import { GeneralModule } from '../../../../../shared/modules/general/general.module';
import { lastValueFrom } from 'rxjs';
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

  solicitudes!: Solicitud[]
  allSolicitudes!:Solicitud[]

  nombreApellido?:string
  fechaActividad?:string
  horaInicio:any
  horaTermino:any
  cantidadHoras:any
  areaTrabajo:any

  async ngOnInit() {
    await this.traerSolicitudes()
    await this.traerTodasSolicitudes()
    this.solicitudService.solicitud$.subscribe((solicitudes)=>{
      this.solicitudes = solicitudes
    })
    this.solicitudService.allSolicitudes$.subscribe((solicitudes)=>{
      this.allSolicitudes = solicitudes
    })
  }

  async traerSolicitudes() {
    try {
      const response = await lastValueFrom(this.solicitudService.traerSolicitudesMes())
      const solicitudes:Solicitud[] = response.solicitudes
      this.solicitudService.setSolicitud(solicitudes) 
    } catch (error: any) {
      console.error(error)
    }
  }

  async confirmarActualizacion(id: number) {
    let response
    try {
      response = await lastValueFrom(this.solicitudService.traerSolicitudId(id))
      console.log(response)
      this.nombreApellido = response.solicitud.nombre
      this.fechaActividad = response.solicitud.fecha
      this.horaInicio = response.solicitud.inicio
      this.horaTermino = response.solicitud.fin
      this.areaTrabajo = response.solicitud.area
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
        await this.actualizarSolicitud(id);
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
      await this.traerSolicitudes()
      await this.traerTodasSolicitudes()
    } catch (error: any) {
      console.error(error)
    }
  }

  private async  traerTodasSolicitudes(){
    try {
      const response = await lastValueFrom(this.solicitudService.traerSolicitudes())
      const solicitudes:Solicitud[] = response.solicitudes
      this.solicitudService.setAllSolicitudes(solicitudes)
    } catch (error:any) {
      console.error(error)
    }
  }



}
