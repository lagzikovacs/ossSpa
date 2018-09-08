import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizonylatContainerComponent } from './bizonylat-container.component';

describe('BizonylatContainerComponent', () => {
  let component: BizonylatContainerComponent;
  let fixture: ComponentFixture<BizonylatContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizonylatContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizonylatContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
