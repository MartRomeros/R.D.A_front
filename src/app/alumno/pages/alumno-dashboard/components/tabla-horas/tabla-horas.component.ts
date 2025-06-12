import { Component, inject, OnInit } from '@angular/core';
import { GeneralModule } from '../../../../../shared/modules/general/general.module';
import { ActividadService } from '../../../../../services/alumno/actividad.service';
import { Actividad, DetallesAlumno, User } from '../../../../../models/interfaces';
import { lastValueFrom } from 'rxjs';
import { ResumenComponent } from '../resumen/resumen.component';
import { AlumnoService } from '../../../../../services/alumno/alumno.service';

@Component({
  selector: 'app-tabla-horas',
  imports: [GeneralModule, ResumenComponent],
  templateUrl: './tabla-horas.component.html',
  styleUrl: './tabla-horas.component.css'
})
export class TablaHorasComponent implements OnInit {

  //servicios
  private actividadService = inject(ActividadService)
  private alumnoService = inject(AlumnoService)

  //variables publicas
  actividades: Actividad[] = []
  cargando: boolean = true

  //ngOnInit(antes de cargar el componente)
  async ngOnInit() {
    this.cargando = true
    this.cargarActvidades()

    this.cargando = false
  }


  //carga las actividades del backend
  private async cargarActvidades() {
    try {
      this.cargando = true
      const response = await lastValueFrom(this.alumnoService.traerActividadesMes());
      const actividades:Actividad[] = response.actividades
      this.actividades = actividades
    } catch (error: any) {
      alert('Error al cargar actividades');
      console.error(error)
    } finally {
      this.cargando = false
    }
  }





}
