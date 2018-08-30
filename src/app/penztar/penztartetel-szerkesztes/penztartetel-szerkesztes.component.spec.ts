import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenztartetelSzerkesztesComponent } from './penztartetel-szerkesztes.component';

describe('PenztartetelSzerkesztesComponent', () => {
  let component: PenztartetelSzerkesztesComponent;
  let fixture: ComponentFixture<PenztartetelSzerkesztesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenztartetelSzerkesztesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenztartetelSzerkesztesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
