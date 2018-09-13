import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizonylatKifizetesSzerkesztesComponent } from './bizonylat-kifizetes-szerkesztes.component';

describe('BizonylatKifizetesSzerkesztesComponent', () => {
  let component: BizonylatKifizetesSzerkesztesComponent;
  let fixture: ComponentFixture<BizonylatKifizetesSzerkesztesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizonylatKifizetesSzerkesztesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizonylatKifizetesSzerkesztesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
