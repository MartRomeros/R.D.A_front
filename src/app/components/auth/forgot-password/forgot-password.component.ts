import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthServicesService } from '../../../services/auth-services.service';
import { last, lastValueFrom } from 'rxjs';
import { GeneralModule } from '../../../shared/modules/general/general.module';

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
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No es posible recuperar la contrasenna!", //cambiar a contrasenna (ESP)
      });
      return
    }

    const valores = this.forgotForm.get('email')?.value

    console.log(valores)

    try {

      const response = await lastValueFrom(this.authService.recuperarClave(valores))
      Swal.fire({
        icon: "success",
        title: response.message,
        showConfirmButton: false,
        timer: 1500
      });

    } catch (error: any) {

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error inesperado!", //cambiar a contrasenna (ESP)
      });

      console.log(error)

    }

  }


}
