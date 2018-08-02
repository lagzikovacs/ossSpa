import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsoportegyComponent } from './csoportegy.component';

describe('CsoportegyComponent', () => {
  let component: CsoportegyComponent;
  let fixture: ComponentFixture<CsoportegyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsoportegyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsoportegyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
