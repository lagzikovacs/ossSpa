import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizonylatSzerkesztesComponent } from './bizonylat-szerkesztes.component';

describe('BizonylatSzerkesztesComponent', () => {
  let component: BizonylatSzerkesztesComponent;
  let fixture: ComponentFixture<BizonylatSzerkesztesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizonylatSzerkesztesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizonylatSzerkesztesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
