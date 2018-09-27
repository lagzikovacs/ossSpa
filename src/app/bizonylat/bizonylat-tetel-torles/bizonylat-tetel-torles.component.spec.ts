import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizonylatTetelTorlesComponent } from './bizonylat-tetel-torles.component';

describe('BizonylatTetelTorlesComponent', () => {
  let component: BizonylatTetelTorlesComponent;
  let fixture: ComponentFixture<BizonylatTetelTorlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizonylatTetelTorlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizonylatTetelTorlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
