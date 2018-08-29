import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsoportTorlesComponent } from './csoport-torles.component';

describe('CsoportTorlesComponent', () => {
  let component: CsoportTorlesComponent;
  let fixture: ComponentFixture<CsoportTorlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsoportTorlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsoportTorlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
