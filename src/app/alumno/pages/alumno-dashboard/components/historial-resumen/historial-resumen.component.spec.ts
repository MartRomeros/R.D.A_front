import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialResumenComponent } from './historial-resumen.component';

describe('HistorialResumenComponent', () => {
  let component: HistorialResumenComponent;
  let fixture: ComponentFixture<HistorialResumenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialResumenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialResumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
