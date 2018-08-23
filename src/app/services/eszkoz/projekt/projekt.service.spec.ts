import { TestBed, inject } from '@angular/core/testing';

import { ProjektService } from './projekt.service';

describe('ProjektService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjektService]
    });
  });

  it('should be created', inject([ProjektService], (service: ProjektService) => {
    expect(service).toBeTruthy();
  }));
});
