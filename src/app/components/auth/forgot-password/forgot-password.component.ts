import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { AuthServicesService } from '../../../services/auth-services.service';
import { last, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatToolbarModule, RouterModule, SweetAlert2Module],
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
