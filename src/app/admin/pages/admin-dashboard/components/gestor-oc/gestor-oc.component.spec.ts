import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorOcComponent } from './gestor-oc.component';

describe('GestorOcComponent', () => {
  let component: GestorOcComponent;
  let fixture: ComponentFixture<GestorOcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestorOcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestorOcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
