import { TestBed, inject } from '@angular/core/testing';

import { HelysegService } from './helyseg.service';

describe('HelysegService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HelysegService]
    });
  });

  it('should be created', inject([HelysegService], (service: HelysegService) => {
    expect(service).toBeTruthy();
  }));
});
