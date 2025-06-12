import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroHistorialComponent } from './tablero-historial.component';

describe('TableroHistorialComponent', () => {
  let component: TableroHistorialComponent;
  let fixture: ComponentFixture<TableroHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableroHistorialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableroHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
