import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FelhasznaloJelszoComponent } from './felhasznalo-jelszo.component';

describe('FelhasznaloJelszoComponent', () => {
  let component: FelhasznaloJelszoComponent;
  let fixture: ComponentFixture<FelhasznaloJelszoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FelhasznaloJelszoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FelhasznaloJelszoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
