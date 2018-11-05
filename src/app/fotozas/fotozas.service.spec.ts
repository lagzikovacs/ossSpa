import { TestBed, inject } from '@angular/core/testing';

import { FotozasService } from './fotozas.service';

describe('FotozasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FotozasService]
    });
  });

  it('should be created', inject([FotozasService], (service: FotozasService) => {
    expect(service).toBeTruthy();
  }));
});
