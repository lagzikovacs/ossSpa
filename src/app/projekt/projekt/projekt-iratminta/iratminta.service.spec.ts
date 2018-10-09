import { TestBed, inject } from '@angular/core/testing';

import { IratmintaService } from './iratminta.service';

describe('IratmintaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IratmintaService]
    });
  });

  it('should be created', inject([IratmintaService], (service: IratmintaService) => {
    expect(service).toBeTruthy();
  }));
});
