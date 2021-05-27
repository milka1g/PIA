import { TestBed } from '@angular/core/testing';

import { PlanAngService } from './plan-ang.service';

describe('PlanAngService', () => {
  let service: PlanAngService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanAngService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
