import { TestBed, inject } from '@angular/core/testing';

import { CsoportService } from './csoport.service';

describe('CsoportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CsoportService]
    });
  });

  it('should be created', inject([CsoportService], (service: CsoportService) => {
    expect(service).toBeTruthy();
  }));
});
