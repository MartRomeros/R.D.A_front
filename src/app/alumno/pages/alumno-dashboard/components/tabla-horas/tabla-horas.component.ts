import { Component, inject, OnInit } from '@angular/core';
import { GeneralModule } from '../../../../../shared/modules/general/general.module';
import { lastValueFrom } from 'rxjs';
import { ResumenComponent } from '../resumen/resumen.component';
import { AlumnoService } from '../../../../../services/alumno/alumno.service';
import { Registro, ResumenMes } from '../../models/interfaces';
import { ActividadService } from '../../../../../services/alumno/actividad.service';

@Component({
  selector: 'app-tabla-horas',
  imports: [GeneralModule, ResumenComponent],
  templateUrl: './tabla-horas.component.html',
  styleUrl: './tabla-horas.component.css'
})
export class TablaHorasComponent implements OnInit {

  //servicios
  private alumnoService = inject(AlumnoService)
  private actividadService = inject(ActividadService)

  //variables publicas
  actividades!: Registro[] | undefined
  cargando: boolean = true

  //ngOnInit(antes de cargar el componente)
  async ngOnInit() {
    this.cargando = true
    await this.cargarActvidades()
    this.actividadService.resumenMes$.subscribe((resumenMes) => {
      this.actividades = resumenMes?.actividades
    })

    this.cargando = false
  }


  //carga las actividades del backend
  private async cargarActvidades() {
    try {
      this.cargando = true
      const response = await lastValueFrom(this.alumnoService.traerResumenMes());
      const resumenMes: ResumenMes = response
      this.actividadService.setResumenMes(resumenMes)
    } catch (error: any) {
      console.error(error)
    } finally {
      this.cargando = false
    }
  }





}
