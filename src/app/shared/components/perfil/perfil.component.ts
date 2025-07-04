import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

interface UserProfile {
  rut: string;
  nombre: string;
  ubicacion: string;
  telefono: string;
  email: string;
}

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HeaderComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  location = inject(Location)

  profileForm: FormGroup;
  loading = false;
  isChangingPassword = false;

  // Estado de visibilidad de contraseñas
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  userProfile: UserProfile = {
    rut: '12.345.678-9',
    nombre: 'Juan Carlos Pérez',
    ubicacion: 'Santiago, Chile',
    telefono: '+56 9 8765 4321',
    email: 'juan.perez@email.com'
  };

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group(
      {
        rut: [{ value: '', disabled: true }],
        nombre: [{ value: '', disabled: true }],
        ubicacion: [{ value: '', disabled: true }],
        telefono: [{ value: '', disabled: true }],
        email: [{ value: '', disabled: true }],
        currentPassword: [''],
        newPassword: [''],
        confirmPassword: ['']
      },
      { validators: this.combinedPasswordValidator }
    );
  }

  goBack():void{
    this.location.back()
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.profileForm.patchValue(this.userProfile);
  }

  toggleChangePassword(): void {
    this.isChangingPassword = !this.isChangingPassword;

    if (!this.isChangingPassword) {
      this.profileForm.get('currentPassword')?.reset();
      this.profileForm.get('newPassword')?.reset();
      this.profileForm.get('confirmPassword')?.reset();

      // También reseteamos visibilidad
      this.showCurrentPassword = false;
      this.showNewPassword = false;
      this.showConfirmPassword = false;
    }
  }

  togglePasswordVisibility(type: 'current' | 'new' | 'confirm'): void {
    if (type === 'current') {
      this.showCurrentPassword = !this.showCurrentPassword;
    } else if (type === 'new') {
      this.showNewPassword = !this.showNewPassword;
    } else if (type === 'confirm') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  async updateProfile(): Promise<void> {
    if (this.profileForm.valid) {
      this.loading = true;
      try {
        const { currentPassword, newPassword } = this.profileForm.getRawValue();

        if (this.isChangingPassword) {
          if (currentPassword !== 'demo123') {
            this.profileForm.get('currentPassword')?.setErrors({ incorrect: true });
            this.loading = false;
            return;
          }

          console.log('Cambio de contraseña:', { currentPassword, newPassword });
          alert('Contraseña cambiada exitosamente');
        }

        alert('Cambios guardados correctamente');
        this.toggleChangePassword();
      } catch (error) {
        console.error('Error:', error);
        alert('Ocurrió un error al guardar los cambios');
      } finally {
        this.loading = false;
      }
    } else {
      this.markFormGroupTouched(this.profileForm);
    }
  }

  combinedPasswordValidator(form: FormGroup) {
    const currentPassword = form.get('currentPassword')!;
    const newPassword = form.get('newPassword')!;
    const confirmPassword = form.get('confirmPassword')!;

    const hasNew = newPassword?.value?.length > 0;

    currentPassword?.setErrors(null);
    newPassword?.setErrors(null);
    confirmPassword?.setErrors(null);

    if (hasNew) {
      if (!currentPassword?.value) {
        currentPassword.setErrors({ required: true });
      }
      if (newPassword.value.length < 8) {
        newPassword.setErrors({ minlength: { requiredLength: 8 } });
      }
      if (newPassword.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordMismatch: true });
      }
    }

    return null;
  }

  getFieldError(fieldName: string, form: FormGroup = this.profileForm): string {
    const field = form.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return 'Este campo es requerido';
      if (field.errors['minlength']) return `Debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
      if (field.errors['passwordMismatch']) return 'Las contraseñas no coinciden';
      if (field.errors['incorrect']) return 'La contraseña actual es incorrecta';
    }
    return '';
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key)?.markAsTouched();
    });
  }
}

