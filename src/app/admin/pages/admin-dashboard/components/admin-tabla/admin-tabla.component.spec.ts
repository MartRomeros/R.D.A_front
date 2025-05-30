import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTablaComponent } from './admin-tabla.component';

describe('AdminTablaComponent', () => {
  let component: AdminTablaComponent;
  let fixture: ComponentFixture<AdminTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTablaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
