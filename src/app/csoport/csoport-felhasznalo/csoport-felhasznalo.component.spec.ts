import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsoportFelhasznaloComponent } from './csoport-felhasznalo.component';

describe('CsoportFelhasznaloComponent', () => {
  let component: CsoportFelhasznaloComponent;
  let fixture: ComponentFixture<CsoportFelhasznaloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsoportFelhasznaloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsoportFelhasznaloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
