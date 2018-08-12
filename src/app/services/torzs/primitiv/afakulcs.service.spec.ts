import { TestBed, inject } from '@angular/core/testing';

import { AfakulcsService } from './afakulcs.service';

describe('AfakulcsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AfakulcsService]
    });
  });

  it('should be created', inject([AfakulcsService], (service: AfakulcsService) => {
    expect(service).toBeTruthy();
  }));
});
