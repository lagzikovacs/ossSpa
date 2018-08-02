import { TestBed, inject } from '@angular/core/testing';

import { ParticioService } from './particio.service';

describe('ParticioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParticioService]
    });
  });

  it('should be created', inject([ParticioService], (service: ParticioService) => {
    expect(service).toBeTruthy();
  }));
});
