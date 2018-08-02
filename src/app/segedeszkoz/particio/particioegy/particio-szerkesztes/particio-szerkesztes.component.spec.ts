import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticioSzerkesztesComponent } from './particio-szerkesztes.component';

describe('ParticioSzerkesztesComponent', () => {
  let component: ParticioSzerkesztesComponent;
  let fixture: ComponentFixture<ParticioSzerkesztesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticioSzerkesztesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticioSzerkesztesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
