import { TestBed, inject } from '@angular/core/testing';

import { PenztarService } from './penztar.service';

describe('PenztarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PenztarService]
    });
  });

  it('should be created', inject([PenztarService], (service: PenztarService) => {
    expect(service).toBeTruthy();
  }));
});
