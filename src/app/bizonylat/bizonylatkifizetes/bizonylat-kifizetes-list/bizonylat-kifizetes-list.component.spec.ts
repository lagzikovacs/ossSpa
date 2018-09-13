import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizonylatKifizetesListComponent } from './bizonylat-kifizetes-list.component';

describe('BizonylatKifizetesListComponent', () => {
  let component: BizonylatKifizetesListComponent;
  let fixture: ComponentFixture<BizonylatKifizetesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizonylatKifizetesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizonylatKifizetesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
