import { TestBed, inject } from '@angular/core/testing';

import { EsemenynaploService } from './esemenynaplo.service';

describe('EsemenynaploService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EsemenynaploService]
    });
  });

  it('should be created', inject([EsemenynaploService], (service: EsemenynaploService) => {
    expect(service).toBeTruthy();
  }));
});
