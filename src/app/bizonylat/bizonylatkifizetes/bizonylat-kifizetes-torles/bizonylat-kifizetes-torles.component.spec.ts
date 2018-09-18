import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizonylatKifizetesTorlesComponent } from './bizonylat-kifizetes-torles.component';

describe('BizonylatKifizetesTorlesComponent', () => {
  let component: BizonylatKifizetesTorlesComponent;
  let fixture: ComponentFixture<BizonylatKifizetesTorlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizonylatKifizetesTorlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizonylatKifizetesTorlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
