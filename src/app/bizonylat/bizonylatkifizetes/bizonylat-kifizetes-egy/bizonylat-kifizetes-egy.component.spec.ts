import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizonylatKifizetesEgyComponent } from './bizonylat-kifizetes-egy.component';

describe('BizonylatKifizetesEgyComponent', () => {
  let component: BizonylatKifizetesEgyComponent;
  let fixture: ComponentFixture<BizonylatKifizetesEgyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizonylatKifizetesEgyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizonylatKifizetesEgyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
