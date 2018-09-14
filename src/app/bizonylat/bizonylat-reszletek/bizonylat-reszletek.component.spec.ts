import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizonylatReszletekComponent } from './bizonylat-reszletek.component';

describe('BizonylatReszletekComponent', () => {
  let component: BizonylatReszletekComponent;
  let fixture: ComponentFixture<BizonylatReszletekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizonylatReszletekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizonylatReszletekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
