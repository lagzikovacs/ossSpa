import { TestBed, inject } from '@angular/core/testing';

import { NavfeltoltesService } from './navfeltoltes.service';

describe('NavfeltoltesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavfeltoltesService]
    });
  });

  it('should be created', inject([NavfeltoltesService], (service: NavfeltoltesService) => {
    expect(service).toBeTruthy();
  }));
});
