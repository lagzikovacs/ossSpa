import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsoportComponent } from './csoport.component';

describe('CsoportComponent', () => {
  let component: CsoportComponent;
  let fixture: ComponentFixture<CsoportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsoportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsoportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
