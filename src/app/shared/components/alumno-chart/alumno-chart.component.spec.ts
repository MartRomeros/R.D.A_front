import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoChartComponent } from './alumno-chart.component';

describe('AlumnoChartComponent', () => {
  let component: AlumnoChartComponent;
  let fixture: ComponentFixture<AlumnoChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnoChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnoChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
