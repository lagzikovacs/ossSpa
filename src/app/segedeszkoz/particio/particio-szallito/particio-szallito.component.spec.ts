import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticioSzallitoComponent } from './particio-szallito.component';

describe('ParticioSzallitoComponent', () => {
  let component: ParticioSzallitoComponent;
  let fixture: ComponentFixture<ParticioSzallitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticioSzallitoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticioSzallitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
