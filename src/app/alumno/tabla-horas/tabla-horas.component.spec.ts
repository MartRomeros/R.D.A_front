import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaHorasComponent } from './tabla-horas.component';

describe('TablaHorasComponent', () => {
  let component: TablaHorasComponent;
  let fixture: ComponentFixture<TablaHorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaHorasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaHorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
