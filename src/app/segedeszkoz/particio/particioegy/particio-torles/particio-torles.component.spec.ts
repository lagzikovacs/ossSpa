import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticioTorlesComponent } from './particio-torles.component';

describe('ParticioTorlesComponent', () => {
  let component: ParticioTorlesComponent;
  let fixture: ComponentFixture<ParticioTorlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticioTorlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticioTorlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
