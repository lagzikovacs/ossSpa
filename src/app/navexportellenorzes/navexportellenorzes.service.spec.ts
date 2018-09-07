import { TestBed, inject } from '@angular/core/testing';

import { NavexportellenorzesService } from './navexportellenorzes.service';

describe('NavexportellenorzesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavexportellenorzesService]
    });
  });

  it('should be created', inject([NavexportellenorzesService], (service: NavexportellenorzesService) => {
    expect(service).toBeTruthy();
  }));
});
