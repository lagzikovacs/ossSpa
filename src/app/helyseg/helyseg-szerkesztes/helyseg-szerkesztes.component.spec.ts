import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelysegSzerkesztesComponent } from './helyseg-szerkesztes.component';

describe('HelysegSzerkesztesComponent', () => {
  let component: HelysegSzerkesztesComponent;
  let fixture: ComponentFixture<HelysegSzerkesztesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelysegSzerkesztesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelysegSzerkesztesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
