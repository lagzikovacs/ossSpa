import { TestBed, inject } from '@angular/core/testing';

import { FizetesimodService } from './fizetesimod.service';

describe('FizetesimodService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FizetesimodService]
    });
  });

  it('should be created', inject([FizetesimodService], (service: FizetesimodService) => {
    expect(service).toBeTruthy();
  }));
});
