import { TestBed, inject } from '@angular/core/testing';

import { FeliratkozasService } from './ugynok.service';

describe('FeliratkozasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeliratkozasService]
    });
  });

  it('should be created', inject([FeliratkozasService], (service: FeliratkozasService) => {
    expect(service).toBeTruthy();
  }));
});
