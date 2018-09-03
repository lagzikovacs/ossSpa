import { TestBed, inject } from '@angular/core/testing';

import { BizonylatService } from './bizonylat.service';

describe('BizonylatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BizonylatService]
    });
  });

  it('should be created', inject([BizonylatService], (service: BizonylatService) => {
    expect(service).toBeTruthy();
  }));
});
