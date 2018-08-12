import { TestBed, inject } from '@angular/core/testing';

import { CikkService } from './cikk.service';

describe('CikkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CikkService]
    });
  });

  it('should be created', inject([CikkService], (service: CikkService) => {
    expect(service).toBeTruthy();
  }));
});
