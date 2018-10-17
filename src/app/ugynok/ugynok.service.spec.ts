import { TestBed, inject } from '@angular/core/testing';

import { UgynokService } from './ugynok.service';

describe('UgynokService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UgynokService]
    });
  });

  it('should be created', inject([UgynokService], (service: UgynokService) => {
    expect(service).toBeTruthy();
  }));
});
