import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizonylatIratListComponent } from './bizonylat-irat-list.component';

describe('BizonylatIratListComponent', () => {
  let component: BizonylatIratListComponent;
  let fixture: ComponentFixture<BizonylatIratListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizonylatIratListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizonylatIratListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
