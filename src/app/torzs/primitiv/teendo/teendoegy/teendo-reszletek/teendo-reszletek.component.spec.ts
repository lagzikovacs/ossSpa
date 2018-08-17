import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeendoReszletekComponent } from './teendo-reszletek.component';

describe('TeendoReszletekComponent', () => {
  let component: TeendoReszletekComponent;
  let fixture: ComponentFixture<TeendoReszletekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeendoReszletekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeendoReszletekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
