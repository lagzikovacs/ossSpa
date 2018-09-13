import { TestBed, inject } from '@angular/core/testing';

import { BizonylatkapcsolatService } from './bizonylatkapcsolat.service';

describe('BizonylatkapcsolatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BizonylatkapcsolatService]
    });
  });

  it('should be created', inject([BizonylatkapcsolatService], (service: BizonylatkapcsolatService) => {
    expect(service).toBeTruthy();
  }));
});
