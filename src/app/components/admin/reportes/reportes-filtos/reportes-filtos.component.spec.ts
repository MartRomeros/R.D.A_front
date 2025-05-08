import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesFiltosComponent } from './reportes-filtos.component';

describe('ReportesFiltosComponent', () => {
  let component: ReportesFiltosComponent;
  let fixture: ComponentFixture<ReportesFiltosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportesFiltosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesFiltosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
