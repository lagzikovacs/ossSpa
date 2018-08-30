import { TestBed, inject } from '@angular/core/testing';

import { ProjektkapcsolatService } from './projektkapcsolat.service';

describe('ProjektkapcsolatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjektkapcsolatService]
    });
  });

  it('should be created', inject([ProjektkapcsolatService], (service: ProjektkapcsolatService) => {
    expect(service).toBeTruthy();
  }));
});
