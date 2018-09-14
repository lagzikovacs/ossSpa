import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizonylatIratContainerComponent } from './bizonylat-irat-container.component';

describe('BizonylatIratContainerComponent', () => {
  let component: BizonylatIratContainerComponent;
  let fixture: ComponentFixture<BizonylatIratContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizonylatIratContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizonylatIratContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
