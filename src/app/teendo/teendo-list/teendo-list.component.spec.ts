import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeendoListComponent } from './teendo-list.component';

describe('TeendoListComponent', () => {
  let component: TeendoListComponent;
  let fixture: ComponentFixture<TeendoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeendoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeendoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
