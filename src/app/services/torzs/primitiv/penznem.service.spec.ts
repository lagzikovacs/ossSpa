import { TestBed, inject } from '@angular/core/testing';

import { PenznemService } from './penznem.service';

describe('PenznemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PenznemService]
    });
  });

  it('should be created', inject([PenznemService], (service: PenznemService) => {
    expect(service).toBeTruthy();
  }));
});
