import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FelhasznaloSzerkesztesComponent } from './felhasznalo-szerkesztes.component';

describe('FelhasznaloSzerkesztesComponent', () => {
  let component: FelhasznaloSzerkesztesComponent;
  let fixture: ComponentFixture<FelhasznaloSzerkesztesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FelhasznaloSzerkesztesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FelhasznaloSzerkesztesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
