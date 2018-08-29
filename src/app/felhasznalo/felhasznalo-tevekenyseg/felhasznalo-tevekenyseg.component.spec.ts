import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FelhasznaloTevekebysegComponent } from './felhasznalo-tevekenyseg.component';

describe('FelhasznaloTevekebysegComponent', () => {
  let component: FelhasznaloTevekebysegComponent;
  let fixture: ComponentFixture<FelhasznaloTevekebysegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FelhasznaloTevekebysegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FelhasznaloTevekebysegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
