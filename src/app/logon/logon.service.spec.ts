import { TestBed, inject } from '@angular/core/testing';

import { LogonService } from './logon.service';

describe('LogonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogonService]
    });
  });

  it('should be created', inject([LogonService], (service: LogonService) => {
    expect(service).toBeTruthy();
  }));
});
