import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizonylatKifizetesContainerComponent } from './bizonylat-kifizetes-container.component';

describe('BizonylatKifizetesContainerComponent', () => {
  let component: BizonylatKifizetesContainerComponent;
  let fixture: ComponentFixture<BizonylatKifizetesContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizonylatKifizetesContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizonylatKifizetesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
