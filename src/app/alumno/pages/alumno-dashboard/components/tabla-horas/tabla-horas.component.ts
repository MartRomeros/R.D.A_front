import { Component, inject, OnInit } from '@angular/core';
import { GeneralModule } from '../../../../../shared/modules/general/general.module';
import { ActividadService } from '../../../../../services/alumno/actividad.service';
import { Actividad, DetallesAlumno, User } from '../../../../../models/interfaces';
import { lastValueFrom } from 'rxjs';
import { ResumenComponent } from '../resumen/resumen.component';

@Component({
  selector: 'app-tabla-horas',
  imports: [GeneralModule,ResumenComponent],
  templateUrl: './tabla-horas.component.html',
  styleUrl: './tabla-horas.component.css'
})
export class TablaHorasComponent implements OnInit {

  //servicios
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
      const response:DetallesAlumno = await lastValueFrom(this.actividadService.traerDetallesDelAlumno());
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
