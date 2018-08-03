import { TestBed, inject } from '@angular/core/testing';

import { RiportService } from './riport.service';

describe('RiportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RiportService]
    });
  });

  it('should be created', inject([RiportService], (service: RiportService) => {
    expect(service).toBeTruthy();
  }));
});
