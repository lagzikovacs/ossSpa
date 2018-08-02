import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FelhasznaloComponent } from './felhasznalo.component';

describe('FelhasznaloComponent', () => {
  let component: FelhasznaloComponent;
  let fixture: ComponentFixture<FelhasznaloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FelhasznaloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FelhasznaloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
