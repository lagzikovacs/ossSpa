import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenztarSzerkesztesComponent } from './penztar-szerkesztes.component';

describe('PenztarSzerkesztesComponent', () => {
  let component: PenztarSzerkesztesComponent;
  let fixture: ComponentFixture<PenztarSzerkesztesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenztarSzerkesztesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenztarSzerkesztesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
