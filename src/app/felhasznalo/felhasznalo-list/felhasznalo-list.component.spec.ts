import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FelhasznaloListComponent } from './felhasznalo-list.component';

describe('FelhasznaloListComponent', () => {
  let component: FelhasznaloListComponent;
  let fixture: ComponentFixture<FelhasznaloListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FelhasznaloListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FelhasznaloListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
