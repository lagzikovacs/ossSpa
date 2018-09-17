import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizonylatKiszallitvaComponent } from './bizonylat-kiszallitva.component';

describe('BizonylatKiszallitvaComponent', () => {
  let component: BizonylatKiszallitvaComponent;
  let fixture: ComponentFixture<BizonylatKiszallitvaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizonylatKiszallitvaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizonylatKiszallitvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
