import { TestBed, inject } from '@angular/core/testing';

import { IrattipusService } from './irattipus.service';

describe('IrattipusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IrattipusService]
    });
  });

  it('should be created', inject([IrattipusService], (service: IrattipusService) => {
    expect(service).toBeTruthy();
  }));
});
