import { TestBed, inject } from '@angular/core/testing';

import { IratService } from './irat.service';

describe('IratService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IratService]
    });
  });

  it('should be created', inject([IratService], (service: IratService) => {
    expect(service).toBeTruthy();
  }));
});
