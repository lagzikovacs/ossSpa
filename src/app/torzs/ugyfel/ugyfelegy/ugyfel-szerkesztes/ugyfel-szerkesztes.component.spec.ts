import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgyfelSzerkesztesComponent } from './ugyfel-szerkesztes.component';

describe('UgyfelSzerkesztesComponent', () => {
  let component: UgyfelSzerkesztesComponent;
  let fixture: ComponentFixture<UgyfelSzerkesztesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UgyfelSzerkesztesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgyfelSzerkesztesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
