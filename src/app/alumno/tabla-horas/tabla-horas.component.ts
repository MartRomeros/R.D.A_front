import { Component, inject, OnInit } from '@angular/core';
import { GeneralModule } from '../../shared/modules/general/general.module';
import { AuthServicesService } from '../../services/auth-services.service';
import { UserService } from '../../services/user.service';
import { ActividadService } from '../../services/actividad.service';
import { Actividad, User } from '../../models/interfaces';
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
  actividades!: Actividad[]
  cargando: boolean = true

  //ngOnInit(antes de cargar el componente)
  async ngOnInit() {
    this.cargando = true
    this.actividadService.actividades$.subscribe((actividades) => {
      this.actividades = actividades      
    })
    await this.CargarActvidades()
    this.cargando = false
  }


  //carga las actividades del backend
  private async CargarActvidades() {
    try {
      this.cargando = true
      //obtiene el usuario por mail
      const usuario: User = await lastValueFrom(this.usuarioService.findUserbyEmail());
      //obtener el run del usuario
      const run: string = usuario.run;
      //trae las actividades actuales del usuario
      const actvidadesResponse = await lastValueFrom(this.actividadService.traerActividadesByAlumno(run));
      //actualiza las actividades
      this.actividadService.setActvidades(actvidadesResponse.actividades);
    } catch (error: any) {
      alert('Error al cargar actividades');
    } finally {
      this.cargando = false
    }
  }



}
