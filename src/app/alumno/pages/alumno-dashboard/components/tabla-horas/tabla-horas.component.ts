import { Component, inject, OnInit } from '@angular/core';
import { GeneralModule } from '../../../../../shared/modules/general/general.module';
import { AuthServicesService } from '../../../../../services/auth-services.service';
import { UserService } from '../../../../../services/user.service';
import { ActividadService } from '../../../../../services/actividad.service';
import { Actividad, ActividadResponse, DetallesAlumno, User } from '../../../../../models/interfaces';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-tabla-horas',
  imports: [GeneralModule],
  templateUrl: './tabla-horas.component.html',
  styleUrl: './tabla-horas.component.css'
})
export class TablaHorasComponent implements OnInit {

  //servicios
  private authService = inject(AuthServicesService)
  private usuarioService = inject(UserService)
  private actividadService = inject(ActividadService)

  //variables publicas
  actividades: Actividad[] = []
  cargando: boolean = true

  //ngOnInit(antes de cargar el componente)
  async ngOnInit() {
    this.cargando = true
    await this.CargarActvidades()
    this.actividadService.detallesAlumno$.subscribe((detallesAlumno)=>{
      this.actividades = detallesAlumno.actividadesPorMes
    })
    this.cargando = false
  }


  //carga las actividades del backend
  private async CargarActvidades() {
    try {
      this.cargando = true
      const response = await lastValueFrom(this.actividadService.traerDetallesDelAlumno());
      //actualiza las actividades
      this.actividadService.setDetallesAlumnoSubject(response);
    } catch (error: any) {
      alert('Error al cargar actividades');
      console.error(error)
    } finally {
      this.cargando = false
    }
  }





}
