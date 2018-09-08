import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizonylatEgyComponent } from './bizonylat-egy.component';

describe('BizonylatEgyComponent', () => {
  let component: BizonylatEgyComponent;
  let fixture: ComponentFixture<BizonylatEgyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizonylatEgyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizonylatEgyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
