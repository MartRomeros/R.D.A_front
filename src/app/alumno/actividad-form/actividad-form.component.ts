import { Component, inject } from '@angular/core';
import { GeneralModule } from '../../shared/modules/general/general.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActividadService } from '../../services/actividad.service';
import { lastValueFrom } from 'rxjs';
import { Actividad, User } from '../../models/interfaces';
import { UserService } from '../../services/user.service';
import { provideNativeDateAdapter } from '@angular/material/core';

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

  //formbuilder
  private fb = inject(FormBuilder)

  //variables publicas
  //formulario de actividades
  actividadForm: FormGroup = this.fb.group({
    fecha: [''],
    horaInic: [''],
    horaTerm: [''],
    area: ['']
  })

  //metodo para registrar horas (Public)
  async registrarHora() {
    //formateo de fechas
    const date: Date = new Date(this.actividadForm.get('fecha')?.value)
    const dia: string = date.getDate().toString().padStart(2, '0')
    const mes: string = (date.getMonth() + 1).toString().padStart(2, '0')
    const anio: string = date.getFullYear().toString().slice(-2)
    const fechaFormateada: string = `${dia}/${mes}/${anio}`
    try {
      //traer al usuario por el email que esta en la cookie
      const usuario: User = await lastValueFrom(this.userService.findUserbyEmail())
      //obtener el run del usuario
      const run: string = usuario.run
      const valores: Actividad = {
        area_trabajo: this.actividadForm.get('area')?.value,
        fecha_actividad: fechaFormateada,
        hora_inic_activdad: this.actividadForm.get('horaInic')?.value,
        hora_term_actividad: this.actividadForm.get('horaTerm')?.value,
        run_alumno: run
      }      
      //registrar actividad
      const response = await lastValueFrom(this.actividadService.registrarActividad(valores))
      //actualizar valores
      const actividadesActuales = this.actividadService.getActividades()
      this.actividadService.setActvidades([...actividadesActuales, valores])
      alert(response.message)

    } catch (error: any) {
      alert('error en registrar horas')
    }
  }


}
