import { TestBed, inject } from '@angular/core/testing';

import { PenztartetelService } from './penztartetel.service';

describe('PenztartetelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PenztartetelService]
    });
  });

  it('should be created', inject([PenztartetelService], (service: PenztartetelService) => {
    expect(service).toBeTruthy();
  }));
});
