import { TestBed, inject } from '@angular/core/testing';

import { VerzioService } from './verzio.service';

describe('VerzioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerzioService]
    });
  });

  it('should be created', inject([VerzioService], (service: VerzioService) => {
    expect(service).toBeTruthy();
  }));
});
