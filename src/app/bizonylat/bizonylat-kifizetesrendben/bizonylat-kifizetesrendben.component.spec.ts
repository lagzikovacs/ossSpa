import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizonylatKifizetesrendbenComponent } from './bizonylat-kifizetesrendben.component';

describe('BizonylatKifizetesrendbenComponent', () => {
  let component: BizonylatKifizetesrendbenComponent;
  let fixture: ComponentFixture<BizonylatKifizetesrendbenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizonylatKifizetesrendbenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizonylatKifizetesrendbenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
