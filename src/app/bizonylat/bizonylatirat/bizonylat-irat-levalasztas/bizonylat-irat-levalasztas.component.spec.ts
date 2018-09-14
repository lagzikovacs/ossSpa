import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizonylatIratLevalasztasComponent } from './bizonylat-irat-levalasztas.component';

describe('BizonylatIratLevalasztasComponent', () => {
  let component: BizonylatIratLevalasztasComponent;
  let fixture: ComponentFixture<BizonylatIratLevalasztasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizonylatIratLevalasztasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizonylatIratLevalasztasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
