import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizonylatTorlesComponent } from './bizonylat-torles.component';

describe('BizonylatTorlesComponent', () => {
  let component: BizonylatTorlesComponent;
  let fixture: ComponentFixture<BizonylatTorlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizonylatTorlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizonylatTorlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
