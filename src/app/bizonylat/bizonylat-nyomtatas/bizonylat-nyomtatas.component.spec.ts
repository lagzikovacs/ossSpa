import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizonylatNyomtatasComponent } from './bizonylat-nyomtatas.component';

describe('BizonylatNyomtatasComponent', () => {
  let component: BizonylatNyomtatasComponent;
  let fixture: ComponentFixture<BizonylatNyomtatasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizonylatNyomtatasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizonylatNyomtatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
