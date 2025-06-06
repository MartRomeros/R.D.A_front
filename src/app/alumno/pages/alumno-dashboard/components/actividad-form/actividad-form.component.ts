import { Component, inject } from '@angular/core';
import { GeneralModule } from '../../../../../shared/modules/general/general.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActividadService } from '../../../../../services/actividad.service';
import { lastValueFrom } from 'rxjs';
import { Actividad, ActividadResponse, DetallesAlumno, User } from '../../../../../models/interfaces';
import { UserService } from '../../../../../services/user.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MensajeriaService } from '../../../../../services/mensajeria.service';


@Component({
  selector: 'app-actividad-form',
  imports: [GeneralModule, ReactiveFormsModule, FormsModule],
  templateUrl: './actividad-form.component.html',
  styleUrl: './actividad-form.component.css',
  providers: [provideNativeDateAdapter()]
})
export class ActividadFormComponent {

  //servicios
  private actividadService = inject(ActividadService)
  private userService = inject(UserService)
  private mensajeService = inject(MensajeriaService)

  //variables privadas
  private actividades!:Actividad[]

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
      //obtener usuario
      const usuario: User = await lastValueFrom(this.userService.findUserbyEmail());
      //obtener run del usuario
      const run: string = usuario.run
      //valores a mandar en el backend
      const body = {
        fecha_actividad: strFecha,
        hora_inic_activdad: horaInicIso,
        hora_term_actividad: horaTermIso,
        run_alumno: run,
        area_trabajo: this.actividadForm.get('area')?.value
      }

      const response = await lastValueFrom(this.actividadService.registrarActividad(body))
      this.mensajeService.mostrarMensajeExito(response.message)

      const actividadResponse:ActividadResponse = await lastValueFrom(this.actividadService.traerActividadesByAlumno())
      this.actividades = actividadResponse.actividades
      this.actividadService.setActvidades(this.actividades)

      const detalleAlumno:DetallesAlumno = await lastValueFrom(this.actividadService.traerDetallesDelAlumno())
      this.actividadService.setHorasTotalesMes(detalleAlumno.horasTotalesMes!)
      this.actividadService.setHorasPorAreaSubject(detalleAlumno)


    } catch (error: any) {
      this.mensajeService.mostrarMensajeError('error al registrar las horas');
    }
  }


}
