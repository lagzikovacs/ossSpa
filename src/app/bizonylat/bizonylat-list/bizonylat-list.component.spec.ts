import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizonylatListComponent } from './bizonylat-list.component';

describe('BizonylatListComponent', () => {
  let component: BizonylatListComponent;
  let fixture: ComponentFixture<BizonylatListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizonylatListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizonylatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
