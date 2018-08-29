import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenznemSzerkesztesComponent } from './penznem-szerkesztes.component';

describe('PenznemSzerkesztesComponent', () => {
  let component: PenznemSzerkesztesComponent;
  let fixture: ComponentFixture<PenznemSzerkesztesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenznemSzerkesztesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenznemSzerkesztesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
