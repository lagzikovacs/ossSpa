import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CikkSzerkesztesComponent } from './cikk-szerkesztes.component';

describe('CikkSzerkesztesComponent', () => {
  let component: CikkSzerkesztesComponent;
  let fixture: ComponentFixture<CikkSzerkesztesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CikkSzerkesztesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CikkSzerkesztesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
