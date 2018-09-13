import { TestBed, inject } from '@angular/core/testing';

import { BizonylatnyomtatasService } from './bizonylatnyomtatas.service';

describe('BizonylatnyomtatasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BizonylatnyomtatasService]
    });
  });

  it('should be created', inject([BizonylatnyomtatasService], (service: BizonylatnyomtatasService) => {
    expect(service).toBeTruthy();
  }));
});
