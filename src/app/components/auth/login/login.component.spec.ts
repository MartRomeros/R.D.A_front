import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login.component';
import { GeneralModule } from '../../../shared/modules/general/general.module';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { AuthServicesService } from '../../../services/auth-services.service';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

// ✅ Mock del servicio
class MockAuthServicesService {
  login(credentials: any) {
    return of({ token: 'fake-token' });
  }
}

// Mock de ActivatedRoute
const mockActivatedRoute = {
  snapshot: {
    paramMap: {
      get: (key: string) => null
    }
  },
  queryParams: of({}),
  params: of({})
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        BrowserAnimationsModule,
        LoginComponent,
        GeneralModule
      ],
      providers: [
        provideHttpClientTesting(),
        { provide: AuthServicesService, useClass: MockAuthServicesService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute } // ✅ Añade el mock aquí
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('el formulario debe ser válido con datos correctos', () => {
    component.loginForm.setValue({
      email: 'mart.romeros@duocuc.cl',
      password: 'Martin'
    });
    expect(component.loginForm.valid).toBeTrue();
  });

  it('debe mostrar mensaje de error si el email es inválido', () => {
    component.loginForm.get('email')?.setValue('correo_invalido');
    component.loginForm.get('email')?.markAsTouched();
    fixture.detectChanges();

    const errorText = fixture.debugElement.query(By.css('.text-danger.text-general'));
    expect(errorText.nativeElement.textContent).toContain('Formato no valido!');
  });

  it('debe llamar al método login del AuthServicesService al enviar el formulario', () => {
    const authService = TestBed.inject(AuthServicesService);
    const loginSpy = spyOn(authService, 'login').and.callThrough();

    component.loginForm.setValue({
      email: 'mart.romeros@duocuc.cl',
      password: 'Martin'
    });

    fixture.debugElement.query(By.css('form')).triggerEventHandler('ngSubmit', null);
    expect(loginSpy).toHaveBeenCalled();
  });

});