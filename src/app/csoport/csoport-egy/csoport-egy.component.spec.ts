import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsoportEgyComponent } from './csoport-egy.component';

describe('CsoportEgyComponent', () => {
  let component: CsoportEgyComponent;
  let fixture: ComponentFixture<CsoportEgyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsoportEgyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsoportEgyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
