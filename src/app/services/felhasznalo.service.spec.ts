import { TestBed, inject } from '@angular/core/testing';

import { FelhasznaloService } from './felhasznalo.service';

describe('FelhasznaloService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FelhasznaloService]
    });
  });

  it('should be created', inject([FelhasznaloService], (service: FelhasznaloService) => {
    expect(service).toBeTruthy();
  }));
});
