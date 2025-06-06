import { Component, inject, OnInit } from '@angular/core';
import { GeneralModule } from '../../../../../shared/modules/general/general.module';
import { MatSelectModule } from '@angular/material/select'
import { ActividadService } from '../../../../../services/actividad.service';
import { lastValueFrom } from 'rxjs';
import { Actividad, ActividadResponse } from '../../../../../models/interfaces';

@Component({
  selector: 'app-tablero-historial',
  imports: [GeneralModule, MatSelectModule],
  templateUrl: './tablero-historial.component.html',
  styleUrl: './tablero-historial.component.css',
  standalone: true
})
export class TableroHistorialComponent implements OnInit {
  //servicios
  private actividadService: ActividadService = inject(ActividadService)


  //variables privadas
  private meses: string[] = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
  private mesActual: number = new Date().getMonth()
  private mesFiltro?: string
  private areaFiltro?: string

  //variables publicas
  mesesHastaAhora: string[] = this.meses.slice(0, this.mesActual + 1)
  actividades!: Actividad[]

  //ngoninit
  async ngOnInit() {
    await this.filtrarActividades()
    this.actividadService.actividadesParaFiltrar$.subscribe((actividad) => {
      this.actividades = actividad
    })
  }


  async filtrarActividades() {
    try {
      const response = await lastValueFrom(this.actividadService.traerActividadesFiltradas(this.mesFiltro,this.areaFiltro))
      console.log(response)
      this.actividadService.setActividadesParaFiltrar(response.actividadesFiltradas)
    } catch (error: any) {
      console.error(error)
    }
  }

  asignarMes(mes: number | undefined) {
    if (mes || mes === 0) {
      const now = new Date()
      const year = now.getFullYear();
      const mesFiltro = mes + 1
      const mesYanio = `0${mesFiltro}${year}`
      this.mesFiltro = mesYanio
    }else{
      this.mesFiltro = undefined
    }
  }

  asignarArea(area: string) {
    if (area !== '') {
      this.areaFiltro = area
    } else {
      this.areaFiltro = undefined
    }
  }

}
