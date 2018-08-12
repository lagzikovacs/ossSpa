import { TestBed, inject } from '@angular/core/testing';

import { UgyfelService } from './ugyfel.service';

describe('UgyfelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UgyfelService]
    });
  });

  it('should be created', inject([UgyfelService], (service: UgyfelService) => {
    expect(service).toBeTruthy();
  }));
});
