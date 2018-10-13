import { TestBed, inject } from '@angular/core/testing';

import { NgmService } from './ngm.service';

describe('NgmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgmService]
    });
  });

  it('should be created', inject([NgmService], (service: NgmService) => {
    expect(service).toBeTruthy();
  }));
});
