import { Component, inject, OnInit } from '@angular/core';
import { GeneralModule } from '../../../../../shared/modules/general/general.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActividadService } from '../../../../../services/alumno/actividad.service';
import { lastValueFrom } from 'rxjs';
import { AreaTrabajo } from '../../../../../models/interfaces';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MensajeriaService } from '../../../../../services/mensajeria.service';
import { AreaTrabajoService } from '../../../../../services/area-trabajo.service';
import { AlumnoService } from '../../../../../services/alumno/alumno.service';
import { HorasAreasMes } from '../../models/interfaces';
import { NgxEchartsModule } from 'ngx-echarts';


@Component({
  selector: 'app-actividad-form',
  imports: [GeneralModule, ReactiveFormsModule, FormsModule, NgxEchartsModule],
  templateUrl: './actividad-form.component.html',
  styleUrl: './actividad-form.component.css',
  providers: [provideNativeDateAdapter()]
})
export class ActividadFormComponent implements OnInit {

  //servicios
  private actividadService = inject(ActividadService)
  private areaTrabajoService = inject(AreaTrabajoService)
  private mensajeService = inject(MensajeriaService)
  private alumnoService = inject(AlumnoService)

  //variables privadas
  private horasAreaMes!: HorasAreasMes
  areasTrabajo!: AreaTrabajo[]

  //formbuilder
  private fb = inject(FormBuilder)


  //variables publicas
  //formulario de actividades
  actividadForm: FormGroup = this.fb.group({
    fecha: ['', Validators.required],
    horaInic: ['', Validators.required],
    horaTerm: ['', Validators.required],
    area: ['', Validators.required]
  })

  horasAM = ['07:00', '07:15', '07:30', '07:45',
    '08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45',]

  horasPM = ['12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45',
    '17:00', '17:15', '17:30', '17:45', '18:00', '18:15', '18:30', '18:45', '19:00', '19:15', '19:30', '19:45', '20:00', '20:15', '20:30', '20:45',
    '21:00', '21:15', '21:30', '21:45', '22:00', '22:15', '22:30', '22:45', '23:00', '23:15', '23:30', '23:45',]

  chartOptions: any = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Areas de trabajo',
        type: 'pie',
        radius: '50%',
        data: [],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };





  async ngOnInit() {
    await this.traerAreas()
    await this.traerHorasArea()
    this.alumnoService.horasAreaMes$.subscribe((horasArea)=>{
      this.horasAreaMes = horasArea
      this.actualizarGrafico()
    })
  }

  //metodo para registrar horas (Public)
  async registrarHora() {
    //validar formulario
    if (!this.actividadService.validarActividad(this.actividadForm)) {
      return;
    }

    //formateo de valores
    const fecha = new Date(this.actividadForm.get('fecha')?.value);
    const strFecha = fecha.toISOString().slice(0, 10);

    //formateo de horas
    const horaInicIso = new Date(`${strFecha}T${this.actividadForm.get('horaInic')?.value}`)
    const horaTermIso = new Date(`${strFecha}T${this.actividadForm.get('horaTerm')?.value}`)

    try {
      //valores a mandar en el backend
      const body = {
        fecha_actividad: strFecha,
        hora_inic_activdad: horaInicIso,
        hora_term_actividad: horaTermIso,
        area_trabajo: this.actividadForm.get('area')?.value
      }
      const response = await lastValueFrom(this.actividadService.registrarActividad(body))
      this.mensajeService.mostrarMensajeExito(`${response.message} Tus horas seran validadas pronto!`)
      const horasAreas: HorasAreasMes = await lastValueFrom(this.alumnoService.traerHorasAreasMes())
      this.alumnoService.setHorasAreaMes(horasAreas)

    } catch (error: any) {
      this.mensajeService.mostrarMensajeError('error al registrar las horas');
    }
  }

  private async traerAreas() {
    try {
      const response = await lastValueFrom(this.alumnoService.traerAreas())
      const areasTrabajo: AreaTrabajo[] = response.areasTrabajo
      this.areasTrabajo = areasTrabajo

    } catch (error) {
      console.error(error)
    }
  }

  private async traerHorasArea() {
    try {
      const response: HorasAreasMes = await lastValueFrom(this.alumnoService.traerHorasAreasMes())
      this.alumnoService.setHorasAreaMes(response)
      this.horasAreaMes = response
    } catch (error) {
      console.error(error)
    }
  }

  private actualizarGrafico() {
    this.chartOptions = {
      ...this.chartOptions, // mantiene tooltip y leyenda
      series: [
        {
          ...this.chartOptions.series[0], // copia estilos existentes
          data: [
            { value: this.horasAreaMes.difusion, name: this.areasTrabajo[0].nombre },
            { value: this.horasAreaMes.extension, name: this.areasTrabajo[1].nombre },
            { value: this.horasAreaMes.comunicacion, name: this.areasTrabajo[2].nombre },
            { value: this.horasAreaMes.desarrollo_laboral, name: this.areasTrabajo[3].nombre }
          ]
        }
      ]
    };
  }


}
