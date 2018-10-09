import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjanlatComponent } from './ajanlat';

describe('AjanlatComponent', () => {
  let component: AjanlatComponent;
  let fixture: ComponentFixture<AjanlatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjanlatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjanlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
