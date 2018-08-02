import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektInverterComponent } from './projekt-inverter.component';

describe('ProjektInverterComponent', () => {
  let component: ProjektInverterComponent;
  let fixture: ComponentFixture<ProjektInverterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektInverterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektInverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
