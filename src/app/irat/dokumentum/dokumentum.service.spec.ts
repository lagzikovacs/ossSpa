import { TestBed, inject } from '@angular/core/testing';

import { DokumentumService } from './dokumentum.service';

describe('DokumentumService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DokumentumService]
    });
  });

  it('should be created', inject([DokumentumService], (service: DokumentumService) => {
    expect(service).toBeTruthy();
  }));
});
