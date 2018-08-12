import { TestBed, inject } from '@angular/core/testing';

import { TeendoService } from './teendo.service';

describe('TeendoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeendoService]
    });
  });

  it('should be created', inject([TeendoService], (service: TeendoService) => {
    expect(service).toBeTruthy();
  }));
});
