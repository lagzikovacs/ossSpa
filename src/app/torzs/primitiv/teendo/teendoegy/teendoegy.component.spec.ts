import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeendoegyComponent } from './teendoegy.component';

describe('TeendoegyComponent', () => {
  let component: TeendoegyComponent;
  let fixture: ComponentFixture<TeendoegyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeendoegyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeendoegyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
