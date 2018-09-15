import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizonylatafatablaComponent } from './bizonylatafatabla.component';

describe('BizonylatafatablaComponent', () => {
  let component: BizonylatafatablaComponent;
  let fixture: ComponentFixture<BizonylatafatablaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizonylatafatablaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizonylatafatablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
