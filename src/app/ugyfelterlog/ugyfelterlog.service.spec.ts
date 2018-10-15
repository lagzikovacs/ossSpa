import { TestBed, inject } from '@angular/core/testing';

import { UgyfelterlogService } from './ugyfelterlog.service';

describe('UgyfelterlogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UgyfelterlogService]
    });
  });

  it('should be created', inject([UgyfelterlogService], (service: UgyfelterlogService) => {
    expect(service).toBeTruthy();
  }));
});
