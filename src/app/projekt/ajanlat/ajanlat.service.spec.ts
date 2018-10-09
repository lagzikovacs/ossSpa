import { TestBed, inject } from '@angular/core/testing';

import { AjanlatService } from './ajanlat.service';

describe('AjanlatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AjanlatService]
    });
  });

  it('should be created', inject([AjanlatService], (service: AjanlatService) => {
    expect(service).toBeTruthy();
  }));
});
