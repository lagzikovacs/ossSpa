import { TestBed, inject } from '@angular/core/testing';

import { TermekdijService } from './termekdij.service';

describe('TermekdijService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TermekdijService]
    });
  });

  it('should be created', inject([TermekdijService], (service: TermekdijService) => {
    expect(service).toBeTruthy();
  }));
});
