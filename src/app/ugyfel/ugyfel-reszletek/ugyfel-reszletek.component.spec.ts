import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgyfelReszletekComponent } from './ugyfel-reszletek.component';

describe('UgyfelReszletekComponent', () => {
  let component: UgyfelReszletekComponent;
  let fixture: ComponentFixture<UgyfelReszletekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UgyfelReszletekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgyfelReszletekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
