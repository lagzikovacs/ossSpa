import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizonylatIratVagolaprolComponent } from './bizonylat-irat-vagolaprol.component';

describe('BizonylatIratVagolaprolComponent', () => {
  let component: BizonylatIratVagolaprolComponent;
  let fixture: ComponentFixture<BizonylatIratVagolaprolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizonylatIratVagolaprolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizonylatIratVagolaprolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
