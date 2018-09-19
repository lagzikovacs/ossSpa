import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizonylatOSNxmlComponent } from './bizonylat-osnxml.component';

describe('BizonylatOSNxmlComponent', () => {
  let component: BizonylatOSNxmlComponent;
  let fixture: ComponentFixture<BizonylatOSNxmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizonylatOSNxmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizonylatOSNxmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
