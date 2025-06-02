import { Component, inject } from '@angular/core';
import { GeneralModule } from '../../../shared/modules/general/general.module';
import { lastValueFrom } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServicesService } from '../../../services/auth-services.service';

@Component({
  selector: 'app-forgot-password',
  imports: [GeneralModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder)
  private authService = inject(AuthServicesService)

  forgotForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  })

  //contador de caracteres
  showCounter(field: string): number {
    return this.forgotForm.get(field)?.value.length || 0
  }

  //mostrar error
  hasError(typeError: string): boolean {
    if (this.forgotForm.get('email')?.touched && this.forgotForm.get('email')?.hasError(typeError)) {
      return true
    }
    return false
  }

  async recuperarClave() {

    if (this.forgotForm.get('email')?.hasError('email') || this.forgotForm.get('email')?.hasError('required')) {
      alert('no es posible recuperar la contraseña')
      return
    }

    const valores = this.forgotForm.get('email')?.value

    console.log(valores)

    try {
      const response = await lastValueFrom(this.authService.recuperarClave(valores))
      alert('no es posible recuperar la contrasena')

    } catch (error: any) {
      alert('no es posible recuperar la contrasena error server')
      console.log(error)
    }

  }


}
