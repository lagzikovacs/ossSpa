import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsoportReszletekComponent } from './csoport-reszletek.component';

describe('CsoportReszletekComponent', () => {
  let component: CsoportReszletekComponent;
  let fixture: ComponentFixture<CsoportReszletekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsoportReszletekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsoportReszletekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
