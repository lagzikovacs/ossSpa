import { TestBed, inject } from '@angular/core/testing';

import { ProjektteendoService } from './projektteendo.service';

describe('ProjektteendoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjektteendoService]
    });
  });

  it('should be created', inject([ProjektteendoService], (service: ProjektteendoService) => {
    expect(service).toBeTruthy();
  }));
});
