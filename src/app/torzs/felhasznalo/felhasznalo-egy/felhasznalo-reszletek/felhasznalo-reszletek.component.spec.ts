import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FelhasznaloReszletekComponent } from './felhasznalo-reszletek.component';

describe('FelhasznaloReszletekComponent', () => {
  let component: FelhasznaloReszletekComponent;
  let fixture: ComponentFixture<FelhasznaloReszletekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FelhasznaloReszletekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FelhasznaloReszletekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
