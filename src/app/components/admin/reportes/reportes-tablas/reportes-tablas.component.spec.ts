import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesTablasComponent } from './reportes-tablas.component';

describe('ReportesTablasComponent', () => {
  let component: ReportesTablasComponent;
  let fixture: ComponentFixture<ReportesTablasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportesTablasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesTablasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
