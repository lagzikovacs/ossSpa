import { TestBed, inject } from '@angular/core/testing';

import { UgyfelterService } from './ugyfelter.service';

describe('UgyfelterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UgyfelterService]
    });
  });

  it('should be created', inject([UgyfelterService], (service: UgyfelterService) => {
    expect(service).toBeTruthy();
  }));
});
