import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizonylatErrolComponent } from './bizonylat-errol.component';

describe('BizonylatErrolComponent', () => {
  let component: BizonylatErrolComponent;
  let fixture: ComponentFixture<BizonylatErrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizonylatErrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizonylatErrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
