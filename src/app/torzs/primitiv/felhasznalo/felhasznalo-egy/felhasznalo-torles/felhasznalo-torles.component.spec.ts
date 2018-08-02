import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FelhasznaloTorlesComponent } from './felhasznalo-torles.component';

describe('FelhasznaloTorlesComponent', () => {
  let component: FelhasznaloTorlesComponent;
  let fixture: ComponentFixture<FelhasznaloTorlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FelhasznaloTorlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FelhasznaloTorlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
