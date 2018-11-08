import { TestBed, inject } from '@angular/core/testing';

import { AjanlatkeresService } from './ajanlatkeres.service';

describe('AjanlatkeresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AjanlatkeresService]
    });
  });

  it('should be created', inject([AjanlatkeresService], (service: AjanlatkeresService) => {
    expect(service).toBeTruthy();
  }));
});
