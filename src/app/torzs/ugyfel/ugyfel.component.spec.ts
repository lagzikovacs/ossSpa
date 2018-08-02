import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgyfelComponent } from './ugyfel.component';

describe('UgyfelComponent', () => {
  let component: UgyfelComponent;
  let fixture: ComponentFixture<UgyfelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UgyfelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgyfelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
