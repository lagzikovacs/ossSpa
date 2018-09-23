import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizonylatTetelSzerkesztesComponent } from './bizonylat-tetel-szerkesztes.component';

describe('BizonylatTetelSzerkesztesComponent', () => {
  let component: BizonylatTetelSzerkesztesComponent;
  let fixture: ComponentFixture<BizonylatTetelSzerkesztesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizonylatTetelSzerkesztesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizonylatTetelSzerkesztesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
