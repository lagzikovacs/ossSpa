import { TestBed, inject } from '@angular/core/testing';

import { VagolapService } from './vagolap.service';

describe('VagolapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VagolapService]
    });
  });

  it('should be created', inject([VagolapService], (service: VagolapService) => {
    expect(service).toBeTruthy();
  }));
});
