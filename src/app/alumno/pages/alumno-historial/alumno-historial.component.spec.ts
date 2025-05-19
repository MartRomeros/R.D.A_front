import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoHistorialComponent } from './alumno-historial.component';

describe('AlumnoHistorialComponent', () => {
  let component: AlumnoHistorialComponent;
  let fixture: ComponentFixture<AlumnoHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnoHistorialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnoHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
