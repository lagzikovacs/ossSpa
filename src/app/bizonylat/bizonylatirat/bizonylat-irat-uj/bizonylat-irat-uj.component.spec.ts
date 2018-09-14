import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizonylatIratUjComponent } from './bizonylat-irat-uj.component';

describe('BizonylatIratUjComponent', () => {
  let component: BizonylatIratUjComponent;
  let fixture: ComponentFixture<BizonylatIratUjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizonylatIratUjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizonylatIratUjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
