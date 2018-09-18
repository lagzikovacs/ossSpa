import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizonylatKifizetesReszletekComponent } from './bizonylat-kifizetes-reszletek.component';

describe('BizonylatKifizetesReszletekComponent', () => {
  let component: BizonylatKifizetesReszletekComponent;
  let fixture: ComponentFixture<BizonylatKifizetesReszletekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizonylatKifizetesReszletekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizonylatKifizetesReszletekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
