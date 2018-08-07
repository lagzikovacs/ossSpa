import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeendoComponent } from './teendo.component';

describe('TeendoComponent', () => {
  let component: TeendoComponent;
  let fixture: ComponentFixture<TeendoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeendoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeendoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
