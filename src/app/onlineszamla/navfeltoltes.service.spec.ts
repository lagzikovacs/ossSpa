import { TestBed, inject } from '@angular/core/testing';

import { OnlineszamlaService } from './onlineszamla.service';

describe('OnlineszamlaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnlineszamlaService]
    });
  });

  it('should be created', inject([OnlineszamlaService], (service: OnlineszamlaService) => {
    expect(service).toBeTruthy();
  }));
});
