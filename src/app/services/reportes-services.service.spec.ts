import { TestBed } from '@angular/core/testing';

import { ReportesServicesService } from './reportes-services.service';

describe('ReportesServicesService', () => {
  let service: ReportesServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportesServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
