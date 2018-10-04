import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VagolapComponent } from './vagolap.component';

describe('VagolapComponent', () => {
  let component: VagolapComponent;
  let fixture: ComponentFixture<VagolapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VagolapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VagolapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
