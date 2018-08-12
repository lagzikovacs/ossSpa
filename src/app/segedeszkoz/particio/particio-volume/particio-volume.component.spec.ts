import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticioVolumeComponent } from './particio-volume.component';

describe('ParticioVolumeComponent', () => {
  let component: ParticioVolumeComponent;
  let fixture: ComponentFixture<ParticioVolumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticioVolumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticioVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
