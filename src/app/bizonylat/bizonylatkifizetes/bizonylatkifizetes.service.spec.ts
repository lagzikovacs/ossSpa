import { TestBed, inject } from '@angular/core/testing';

import { BizonylatkifizetesService } from './bizonylatkifizetes.service';

describe('BizonylatkifizetesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BizonylatkifizetesService]
    });
  });

  it('should be created', inject([BizonylatkifizetesService], (service: BizonylatkifizetesService) => {
    expect(service).toBeTruthy();
  }));
});
