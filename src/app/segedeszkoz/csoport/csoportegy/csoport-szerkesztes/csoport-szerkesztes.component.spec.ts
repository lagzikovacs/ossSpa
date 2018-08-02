import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsoportSzerkesztesComponent } from './csoport-szerkesztes.component';

describe('CsoportSzerkesztesComponent', () => {
  let component: CsoportSzerkesztesComponent;
  let fixture: ComponentFixture<CsoportSzerkesztesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsoportSzerkesztesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsoportSzerkesztesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
