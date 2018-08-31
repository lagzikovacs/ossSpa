import { TestBed, inject } from '@angular/core/testing';

import { SzamlazasirendService } from './szamlazasirend.service';

describe('SzamlazasirendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SzamlazasirendService]
    });
  });

  it('should be created', inject([SzamlazasirendService], (service: SzamlazasirendService) => {
    expect(service).toBeTruthy();
  }));
});
