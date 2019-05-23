import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgyfelterBizonylatesiratComponent } from './ugyfelter-bizonylatesirat.component';

describe('UgyfelterBizonylatesiratComponent', () => {
  let component: UgyfelterBizonylatesiratComponent;
  let fixture: ComponentFixture<UgyfelterBizonylatesiratComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UgyfelterBizonylatesiratComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgyfelterBizonylatesiratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
