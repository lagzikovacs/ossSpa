import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FelhasznaloEgyComponent } from './felhasznalo-egy.component';

describe('FelhasznaloEgyComponent', () => {
  let component: FelhasznaloEgyComponent;
  let fixture: ComponentFixture<FelhasznaloEgyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FelhasznaloEgyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FelhasznaloEgyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
