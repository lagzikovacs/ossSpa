import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizonylatPenztarComponent } from './bizonylat-penztar.component';

describe('BizonylatPenztarComponent', () => {
  let component: BizonylatPenztarComponent;
  let fixture: ComponentFixture<BizonylatPenztarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizonylatPenztarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizonylatPenztarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
