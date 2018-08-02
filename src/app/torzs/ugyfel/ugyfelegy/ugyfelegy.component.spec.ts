import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgyfelegyComponent } from './ugyfelegy.component';

describe('UgyfelegyComponent', () => {
  let component: UgyfelegyComponent;
  let fixture: ComponentFixture<UgyfelegyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UgyfelegyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgyfelegyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
