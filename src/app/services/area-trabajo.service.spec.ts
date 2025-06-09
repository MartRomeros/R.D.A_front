import { TestBed } from '@angular/core/testing';

import { AreaTrabajoService } from './area-trabajo.service';

describe('AreaTrabajoService', () => {
  let service: AreaTrabajoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreaTrabajoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
